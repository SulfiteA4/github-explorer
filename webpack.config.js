const path = require('path'); //export feito pelo node 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),//acessa o diretorio que esta o arquivo principal do projeto - utilizando as convenções de cada SO em relação a escrita de caminhos de diretório.Parametros: __dirname = Diretorio do arquivo que esta o webpack.config.js; e o restante são as pastas até o arquivo.
    output: {//fala qual o arquivo que sera geerado com o webpack, que é o bundle.js.
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'//nesse caso, o nome do arquivo é um atributo separado do path.
    },
    resolve: {
        extensions: ['.js', '.jsx'],//linha que determina os tipos de extensões que webpaxk pode ler.
    },
    devServer: {
        watchFiles: path.resolve(__dirname, 'public'),
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        })

    ].filter(Boolean),
    module: {//determina como a aplicação se comporta nas importações pra cada tipo de arquivo.
        rules: [
            {
                test: /\.jsx$/,//teste do tipo de arquivo que será importado.
                exclude: /node_modules/,//exclui arquivos que já estão prontos para o browser ler se o test retornar.
                use: {
                    loader: 'babel-loader',
                    options:{
                        plugins:[
                            isDevelopment && require.resolve('react-refresh/babel'),
                        ].filter(Boolean)
                    }
                },//Basicamente, o babel-loader é a integração entre o babel e o webpack.

            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    }
}