# JSON Translator

A CLI app able to automatically translate a JSON file into any language or prepare a JSON file to be translated by anyone into any language. Can be very useful if you need to generate JSON files with different translations from one with your project's default language.


## Features

- Can handle any JSON file as long as there are no functions types
- Detects numbers, files and urls and skip their translation
- Help included in the CLI
- Uses TSV (TAB separated file) files for the manual translation. These files are easily read by any spreadsheet application.


## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Installation

```sh
$ npm install json-translator -g
```


## Usage

The app has 3 commands, plus you can execute it with no arguments or with --help to get on screen help similar to the following:

### 1- TRANSLATE

This command performs the automatic translation using Google Translator. The idea here is to get a fast translation without the need for a translator. It is a good idea to revise the translation though.

You'll need to pass 4 arguments as shown below, none are optional.

```sh
$ jsontrans translate ./myfile-pt.json pt en
```
The first argument is the command translate, the second is a path that points to a JSON file with your original translation. From this file the translate command will generate a new file with the same structure as the one passed but with the contents translated into a language of choice.

The third argument is the ISO language code of the file passed in the previous argument and the forth is the language you wish your file translated into.

The example above will translate myfile-pt.json from portuguese to english. That will generate a file in the same folder called myfile-pt-en.json. Should the name of the file be equal to it's language code, the resulting file will follow. That means that if we had a file called pt.json instead, the translated file would be en.json.




### 2- PREPARE

This command prepares a JSON file to be manually translated by a human or system. You'll need to pass 4 arguments as shown below, none are optional.

```sh
$ jsontrans prepare ./myfile-pt.json pt en
```

The first argument is the command prepare, the second is a path that points to a JSON file with your original translation. The third argument is the ISO language code of the file passed in the previous argument and the forth is the language you wish your file translated into.

This command will generate a TSV file in the same folder and with the same name as the one passed, but with a tsv extension. The file will have 3 columns as follows:

1- Dot notation of the field in the original JSON file.
2- The field's text in the original language
3- Empty column for the translation to be entered

PLACE EXAMPLE OF THE TSV FILE

The idea is to give this file to the translator and instruct him to type the translations in the third column. Needless to say that if someone tampers 



You'll need the original file to create a new JSON file with the translated text. That is done in the next command.


## Author

**Walter Staeblein** 



## License

[MIT License](https://andreasonny.mit-license.org/2019) © Andrea SonnY