#!/usr/bin/env node
// *************************************
// JSON Translator
// ---------------
//
// Prepare for and Translates JSON files
// *************************************
(async function() {

    var googleTrans = require('@vitalets/google-translate-api');
    var fs = require('fs');
    var path = require('path');
    var version = require('./package.json').version || '';
    var os = require('os');
    var cp = require('chroma-palette');
    var clipboard = require('node-clipboardy');
    var args = process.argv.slice(2);
    var log = console.log;


    if (!args.length || args[0].toLowerCase() == '--help' || args[0].toLowerCase() == 'help' || args[0].toLowerCase() == '-h') { 
        help();
    } else {
        let op = args[0].toLowerCase();
        let tsvfile = '';
        let jsonfile = '';
        let currlang = '', outlang = '';
        let startTime = new Date().getTime();
        let clipBoardFlag = false;

        switch (op) {
            case 'trim':
                if (args.length != 2) { 
                    endThis('Arguments are wrong or in the wrong number'); 
                }       
                
                try {
                    let fn = args[1];
                    let pth = makePath(fn);
                    jsonfile = fs.readFileSync(pth, { encoding:'utf8' }); 
                    let newJSON = JSON.parse(jsonfile, trimUnderscores);   
                    
                    fs.writeFileSync(pth, JSON.stringify(newJSON, null, 4), { encoding:'utf8' });

                } catch (error) {
                    log(error);
                    endThis('An unexpected error has occurred!');                    
                }
                break;

            case 'translate':
                let isclip = args[1].toLowerCase() == 'clip' || args[1].toLowerCase() == 'clipboard';

                if (!(([4, 5].includes(args.length) && isclip) || args.length == 5)) { 
                    endThis('Arguments are wrong or in the wrong number'); 
                }
                let format = args[4].toLowerCase();

                if ('json tsv'.indexOf(format) == -1) { 
                    endThis('Output format not recognized'); 
                }                
                currlang = args[2].toLowerCase();
                outlang = args[3].toLowerCase();
                
                try {
                    let fn = args[1];
                    let pth = makePath(fn);
                    if (isclip) {
                        try {
                            let cbtext = clipboard.readSync();
                            if (!cbtext) { 
                                endThis('Clipboard empty'); 
                            } else {
                                jsonfile = JSON.parse(cbtext);                                    
                            }
                        } catch (error) {
                            log(error);
                            endThis('Clipboard content could not be read and/or formatted'); 
                        }
                        clipBoardFlag = true;
                    } else {
                        jsonfile = JSON.parse(fs.readFileSync(pth, { encoding:'utf8' })); 
                    }

                    let newJSONText = JSON.stringify(await translate(jsonfile, currlang, outlang));
                    let newJSON = JSON.parse(newJSONText, trimUnderscores);

                    if (clipBoardFlag) {
                        clipboard.writeSync(JSON.stringify(newJSON, null, 4));
                        log(`\n${cp.yellow.paint('MESSAGE: ')} Result copied to clipboard!`);
                    } else {                       
                        let parsePth = path.parse(pth);
                        let newpath = path.join(parsePth.dir, (parsePth.name.toLowerCase() == currlang ? outlang : parsePth.name + '-' + outlang));

                        switch (format) {
                            case 'json':
                                fs.writeFileSync(newpath + '.json', JSON.stringify(newJSON, null, 4), { encoding:'utf8' });
                                break;

                            case 'tsv':
                                let emptyTSV = prepare(jsonfile, currlang, outlang);                // Creates TSV ready to be translated
                                let tsvOutPath = newpath + '.tsv';                                  // Creates path to save TSV
                                let newTSV = fillTSV(emptyTSV, newJSON);                            // Translate TSV
                                fs.writeFileSync(tsvOutPath, newTSV, { encoding:'utf8' });          // Saves TSV
                        }
                    }
                } catch (error) {
                    log(error);
                    endThis('An unexpected error has occurred!');
                }
                break;

            case 'prepare':
                if (args.length != 4) {endThis('Arguments are wrong or in insuficient number'); }
                jsonfile = path.resolve(args[1]);
                currlang = args[2];
                outlang = args[3];

                try {
                    let fn = args[1];
                    let pth = makePath(fn, '');
                    let jsonObj = JSON.parse(fs.readFileSync(pth, {encoding:'utf8'}));
                    let newTSV = prepare(jsonObj, currlang, outlang);

                    let parsePth = path.parse(pth);
                    let newpath = path.join(parsePth.dir, parsePth.name + '-' + outlang + '.tsv');

                    fs.writeFileSync(newpath, newTSV, { encoding:'utf8' });

                } catch (error) {
                    endThis(`[${error.message.replace(':', ']')}`);
                }

                break;

            case 'transform':
                if (args.length != 4) { endThis('Insufficient arguments'); }
                tsvpath = path.resolve(args[1]);
                jsonpath = path.resolve(args[2]);
                let newfn = args[3];
                let jsonObj, tsvObj;

                // Read JSON
                try {
                    jsonObj = JSON.parse(fs.readFileSync(jsonpath, {encoding:'utf8'}));

                } catch (error) {
                    endThis(`File ${jsonpath} not found or could not be opened`);
                }

                // Read TSV
                try {
                    tsvObj = fs.readFileSync(tsvpath, {encoding:'utf8'}).split(os.EOL);

                } catch (error) {
                    endThis(`File ${tsvpath} not found or could not be opened`);
                }

                let parsePth = path.parse(makePath(jsonpath));
                let outpath = path.join(parsePth.dir, newfn);
                if (outpath.slice(-5).toLowerCase() != '.json') { outpath += '.json'; }

                let resp = transform(tsvObj, jsonObj, outpath);
                fs.writeFileSync(outpath, JSON.stringify(resp, null, 4), { encoding:'utf8' });

                break;

            default:
                endThis('Unknown command');
                break;
        }
        endThis(Math.round(new Date().getTime() - startTime, 2), 'f');
    }

    // -----------------------------------------
    // Fixes the passed path in order to make it 
    // absolute when needed
    // -----------------------------------------
    function makePath(pth, fn) { 
        pth = path.normalize(pth);
        if (path.isAbsolute(pth)) { 
            return fn ? path.join(pth, fn) : pth;
        } else {
            return fn ? path.join(__dirname, pth, fn) : path.join(__dirname, pth);
        }
    }

    // -----------------------------------------------------------
    // Ends this program execution with a message and an exit code
    // -----------------------------------------------------------
    function endThis(msg, op, code = 0) {
        switch (op) {
            case 'f':
                log(`\n${cp.green.paint('FINISHED: ')}in ${msg} miliseconds`);
                break;
            case 'e':
            default:
                log(cp.yellow.bold.paint(`${cp.red.paint('ERROR: ')}${msg}`));
                break;
        }
        process.exit(code);
    }

    // --------------------------------------------
    // TRANSLATE: Translate using Google Translator
    // --------------------------------------------
    async function translate(json, lang, outlang) { 
        let arr = props2Array(json, lang, outlang); 

        let newJson = JSON.parse(JSON.stringify(json));
        arr.shift();
        let tasks = [];

        arr.forEach(line => {
            tasks.push(new Promise(async function(resolve, reject) {
                try {
                    let tmparr = line.split('\t'), translated;
                    let re = /[\w\-_$]\.[\w\-_$]|[\w\-_$][(\/|\\)][\w\-_$]/;

                    // Only translates if:
                    // Isn't a number 
                    // Isn't a filename or url (if there are chars followed by a dot followed by more chars. eg. file.png)
                    // Don't start with 2 underscores (__)
                    let canTranslate = (tmparr[0].split('.').pop().substr(0, 2) != '__');
                    if (isNaN(tmparr[1]) && !tmparr[1].match(re) && canTranslate) {
                        translated = await translateGoogle(tmparr[1], lang, outlang);
                    } else {
                        translated = tmparr[1];
                    }
                    dotNotation(newJson, tmparr[0], translated);
                    resolve(true);
    
                } catch (error) {
                    log(error);
                    reject(error);
                }
            }));
        });

        try {
            let resp = await Promise.all(tasks);
            return newJson;    

        } catch (error) {
            endThis(`[${error.message.replace(':', ']')}`);
        }

    }

    
    
    // ------------------------------------------------
    // PREPARE: Prepares a new TSV file for translation
    // ------------------------------------------------
    function prepare(json, lang, outlang) {
        let arr = props2Array(json, lang, outlang);
        let index = arr.length;

        while (index--) {
            let dotnot = arr[index].split('\t').shift();
            if (dotnot.includes('.__') || dotnot.substr(0, 2) == '__') {
                arr.splice(index, 1);
            }
        }
        let resp = arr.join(os.EOL);
        return resp;
    }


    // ---------------------------------------------------------
    // TRANSFORM: Creates a JSON file from a translated TSV file
    // ---------------------------------------------------------
    function transform(tsv, json, outputPath) {
        let len = tsv.length;

        for (var i = 1; i < len; i++) {
            let lineArr = tsv[i].split('\t');
            
            if (lineArr.length >= 3) {
                let dots = lineArr[0];
                let value = lineArr[2];
                if (value) { dotNotation(json, dots, value); }
            }
        }
        return json;
    }    


    // ----------------------------------------------------
    // FILLTSV: Inserts text from a JSON file in a TSV file
    // ----------------------------------------------------
    function fillTSV(tsv, json) {
        let tsvArr = tsv.split(os.EOL);
        let len = tsvArr.length;

        for (var i = 1; i < len; i++) {
            let lineArr = tsvArr[i].split('\t');
            lineArr[2] = dotNotation(json, lineArr[0]);
            tsvArr[i] = lineArr.join('\t');
        }
        return tsvArr.join(os.EOL);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ----------------------------------------------------------------
    // Returns or sets (and also returns) a value to an object or array
    // by interpreting it's dotnotation passed in dotArr
    // ----------------------------------------------------------------
    function dotNotation(obj, dotArr, value) {
        if (typeof dotArr == 'string') {
            // Tenta de novo com dotArr como array
            return dotNotation(obj, dotArr.split('.'), value);

        } else if (dotArr.length == 1 && value !== undefined) {
            // Chegamos no ramo da árvore.
            if (isNaN(dotArr[0])) {
                // Se o argumento não for numérico, é um objeto, basta setar o valor
                return obj[dotArr[0]] = value;
            } else {
                // Se já for um array, acrescenta o item, senão cria o array com o item
                if (Array.isArray(obj)) { 
                    obj[+dotArr[0]] = value; 
                } else { 
                    obj = [value]; 
                }
            }
        } else if (dotArr.length==0) {
            // Se dotArr for vazio, retorna o objeto
            return obj;
        } else {
            // Gira a roda
            return dotNotation(obj[dotArr[0]], dotArr.slice(1), value);
        }

        let xx = { 0: '12', 1: '3' }
    }


    // --------------------------------------------------------------------------------------
    // Returns an array with the dotnotation of each property of the object passed in obj Ex:
    // obj = { a: { b: { c: 'hello' } }}
    // Returns:
    // a.b.c [TAB] hello [TAB]
    // With the following first line: 'ID' [TAB] originalLang code [TAB] targetLang code
    // --------------------------------------------------------------------------------------
    function props2Array(obj, originalLang, targetLang) {
        const isObject = val => val && typeof val === 'object';
        const addDelimiter = (a, b) => a ? `${a}.${b}` : b;

        const paths = (obj = {}, head = '') => {
            return Object.entries(obj).reduce((product, [key, value]) => {
                let fullPath = addDelimiter(head, key)

                if (isObject(value)) {
                    return product.concat(paths(value, fullPath));
                } else {
                    return product.concat(fullPath + '\t' + value + '\t');
                }
            }, []);
        }
        let resp = paths(obj);
        resp.unshift('Internal ID\t' + originalLang + '\t' + targetLang);
        return resp;
    }


    // --------------------------------------------------------
    // Translate text in txt using Google translator service
    // tolang e fromlang are the language codes and interval is 
    // the max time to wait between calls in miliseconds
    // --------------------------------------------------------
    async function translateGoogle(txt, fromlang, tolang, interval = 300) {
        return new Promise((resolve) => {
            if (!txt.trim()) { 
                resolve(''); 
            } else {
                let randTime = Math.random() * (interval - 10) + 10;
                setTimeout(() => {
                    googleTrans(txt, { from: fromlang, to: tolang }).then(function(res) {
                        resolve(res.text);

                    }).catch((error) => { 
                        log(error); 
                        resolve(''); 
                    });
                }, randTime);
            }     
        });
    }


    // ----------------------------------------------------
    // Remove leading underscores from a JSON property name
    // ----------------------------------------------------
    function trimUnderscores(key, value) {
        if (key.substr(0, 2) == '__') {
            this[key.slice(2)] = value;
            return;
        } else {
            return value;
        }
    }

    // ----------------------
    // Provides onscreen help
    // ----------------------
    function help() {
        console.info(`

${cp.red.paint(' _   _   _         ___ __   _        _       _  ___  _  __ ')}
${cp.red.paint('  | (_  / \\ |\\ |    |  |_) /_\\ |\\ | (_  |   /_\\  |  / \\ |_)')}
${cp.red.paint('(_|  _) \\_/ | \\|    |  | \\ | | | \\|  _) |_  | |  |  \\ / | \\')}
===========================================================
${cp.yellow.paint('by Walter Staeblein  v. ' + version)}
===========================================================

This app can translate almost any JSON file or prepare a JSON file  for translation 
as a TSV file. You can use the following commands:

${cp.red.paint('1- Automatic Translation')}
------------------------
${cp.yellow.paint('jsontrans translate ./myfile.json pt en json')}

Translate myfile.json from portuguese (pt) to english (en)  and output it as a JSON 
file. The translation is done using Google Translator.  The output file can be JSON
or TSV. If the file name is equal to the language ISO code then the resulting  file 
will follow suit. Otherwise the language code will be appended to the name. In this 
case the file myfile-en.json will be created.
When generating a TSV file with this command, it will come all 3 columns filled in.


${cp.red.paint('2- Prepare File For Manual Translation')}
--------------------------------------
${cp.yellow.paint('jsontrans prepare ./myfile.json pt en')}

Will create myfile.tsv from myfile.json. The first language code is the one the JSON
file is in and the second is the target language of the translation.  This file will 
have 3 columns. The first is a dot notation to the respective field in the JSON, the 
second  is the value of the field and the  third is empty so that the translator can 
fill it in and give back to be transformed.


${cp.red.paint('3- Transforms a Translated File')}
-------------------------------
${cp.yellow.paint('jsontrans transform ./myfile.tsv /myfile.json newfilename')}

Turns the original JSON file  (used to generate the TSV with command 2 and passed as
myfile.json)  into a new JSON file with the translation in place.  The name for this 
new file is passed in newfilename and it's structure will be the same as myfile.json
but the values will be replaced with the ones from myfile.tsv.


${cp.red.paint('4- Trims the original JSON file of it\'s double underscores')}
-----------------------------------------------------------
${cp.yellow.paint('jsontrans trim ./myfile.json')}

Trims the original JSON file,  used to generate the TSV with command 2 and passed as
myfile.json, of it's double underscores in key names. When you prepend 2 underscores
to a key name, it's value won't be translated. This command is to remove those extra
characters from the original file.

`);
        process.exit(0);        
    }

}());