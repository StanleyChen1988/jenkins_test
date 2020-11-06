module.exports = {
    plugins: [
            
            require('precss'),
            require('autoprefixer')({ browsers: ['> 1%', 'IE 9'], cascade: false }),
    ]
}