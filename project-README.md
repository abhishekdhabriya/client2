### public folder is where we serve the content for http server

client.js is going to be the entry point to our application which will bootstrap the entire program including routing.
jsconfig.json is the file for visual studio code that will indicate the compiler option to use when we do code completion

we will make eslint to use babel compiler to understand our code. 

babel-core is just the compiler.  It's just is an engine but without transforms. 
we install transformation via presets. 
presets are a collection of individual transforms. 
react preset includes JSX, flow and display-name
es-2015, es-2016, es-2017 are all preset
four stages of TC-39, stage-0, stage-1, stage-2, stage-3
never include stage presets as they can change. So rather include the individual transform. 
transform-object-rest-spread
static class properties 
// there are syntax definition tells babel how to understand package (parse) and then transform packages. 
// babel-runtime will include polyfills for promises, map and other stuff at runtime.

 in babelrc file we need to have the syntax plugins defined first and then the transform plugins otherwise babel won't work 
.bin folder under node_modules have the executables for all the packages we downloaded. 

we can use default eslint parser or we can use babel as a parser. eslint's default doesn't know how to parse all the advanced features so will use babel parser

env p=options allows us to enable features, globals like browser, window
browser=true will allow now to use browser as a global to be a valid code.

eslint can throw two types of errors, parsing error and rule errors. parsing errors means that the eslint wasn't able to parse the whole file.

we will tell eslint to use babel as it's parser as it can't parse class static properties. 

babel-eslint is like a bridge between eslint and babel and if we use babel-eslint as the parser then it doesn't look at .babelrc
.babelrc will be used by webpack and gulp file.
 {"SwitchCase" : 1} allows use to use tabs for case in switch as a rule
 "semi" : ["error", "always"] error on if we don't have semi's at the end.
  "console": false : console tells that eslint that we can use console without importing it or defined. false means that we cannot re-assign console.
  by default eslint doesn't understand react code, so we need to install a plugin called eslint-plugin-react, react plugin will hook into eslint

"react/jsx-uses-react":"error",
"react/jsx-uses-vars":"error"
allows eslint to understand react

we need to disable the default eslint validation that comes when we install the eslint extension for the editor. 
we want visual studio to use our eslint file.

to install a branch from github we do 
npm install --save gulpjs/gulp#4.0
we should only install cli version globally.. like for gulp-cli

shift+option+f to format the code in mac for visual studio

With gulp 4 we can add on error function and gulp watch won't die if it encounters syntax errors.

we also want gulp to restart the server when it encounters a new file or when we change our file and we can do that with nodemon and hookup with gulp nodemon

gulp server:watch, will kick off build:compile task which will run all the source code through babel and dump the files under build folder. 
then the nodemon will run server.entry.js file which requires server and runs the express server at 3000 port.

webpack is module bundler. 
node-sass is a sass compiler for sass and written in c, so it's very fast.

webpack has plugins and loaders. 
style-loader is the one which  injects into html page as style tag.
json loader loads json file as an object.
url loader to reference external file, it references from file-system and webpack will copy it to destination package.
url and file loader are for files.

to set the environment variable to production, do this on terminal export NODE_ENV=production

In terminal execute adhabriy$ 
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
Press F5 to enable debug mode, make sure that the app is running the chrome browser and the developer tool is closed.

------------------------------------------------------
-- Frontend Masters Notes 

npm run build:dev -s 
// -s tells node to run in silent mode.

webpack validator helps us to validate our webpack configuration file. For example if we mistakenly called output to outputs, then it will complain.

with npm script we can pass arrguments to the script by using -- 
npm run build:dev -s -- dsdasd  // dsdasd will be passed to build:dev script

npm run build:dev -s -- --watch // will watch for any change in our file.

-p is the production flag.

webpack internally uses a yargs module which converts --parameters into properties.
npm run build -p --env.prod // prod will then become the property of the the env object.
pre and post are the lifecycle hooks 



--------------------- launch.json ------------------

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "attach",
            "name": "Chrome:Attach",
            "port": 9222,
            "sourceMaps": true,
            "webRoot": "${workspaceRoot}",
            "url": "http://localhost:3000/*" // This will tell chrome to only debug for this url pattern
        }
    ]
}

--------------------------------------------


Instrumentation __coverage__ on each line.
Babel is pluggable using plugins.
__coverage__ babel plugins add the coverage lines all over the code. 
karma coverage plugins then read all that coverage line and read it into report.
Before we had Istanbul but it didn't work with babel

we can define certain plugins to run under cetain circumstances in babel
Like if we need to run only in test env, then we can set the plugin under test. lookat .babelrc file for more details

Tree Shaking only works with ES6 Modules.
Tree shaking excludes exports from modules where it can be detected the export is not used.Uglify  then deletes the dead code.
Treeshaking happens at static time and it will remove the code before the bundle.
UnCss is similar to Treeshaking 

Treeshaking is webpack2 feature and it happens when webpack can resolves the ES6 modules. Right now in our code babel is transpiling our ES6 modules to 
ES5 code and hence webpack can't do tree shaking. 

So we need to turn off the module feature from Babel and let Webpack take care of modules. Since webpack understand ES6 code it can also apply treeshaking.