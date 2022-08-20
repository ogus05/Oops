const fs = require('fs');
const path = require('path');


const setEntry = srcDir => {
    const ret = {};
    const exceptFiles = ["module", "interface"];
    const lowerForderNames = fs.readdirSync(path.join(__dirname, srcDir));
    lowerForderNames.forEach(forderName => {
        if(exceptFiles.indexOf(forderName) === -1){
            ret[forderName] = `${srcDir}/${forderName}/${forderName}.tsx`;
        }
    })
    console.log('entries: ')
    console.log(ret);
    return ret;
}


module.exports = {
    mode: 'development',
    entry: setEntry('./src'),
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname, 'public', 'js'),
    },
    resolve:{
        extensions: ['.ts', '.tsx', '.js']
    },
    module:{
        rules: [
            {
                test:/\.(ts|tsx)$/,
                use:[
                    'babel-loader',
                    {
                        loader:'ts-loader',
                        options:{
                            transpileOnly:true,
                        },
                    },
                ],
                exclude:[
                    /node_modules/
                ],
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(eot)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    }

}