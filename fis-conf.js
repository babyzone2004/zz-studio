fis.config.set('name', 'apm-h5');
//把前面的配置都写在这里统一管理
//项目中就不用再写了
fis.config.set('roadmap.path', [{
  reg: /.*\.md|.*\.inline\.png|.*\.tpl|map.json|conf\/.*|test\/.*|design\/.*|md5.js|components\/dialog\/.*|templates\/.*|.*\.inline\.js/,
  release: false //不发布
}, {
  reg: /assets\/js\/lang\/(lang).js/,
  isMod: false,
  release: '/${name}/assets-$1'
}, {
  //外部component目录下的代码，由于component规范，已经有了版本号
  //我将它们直接发送到${name}/c目录下就好了
  reg: /^\/components\/.*\/(.*)$/i,
  //追加isComponentModules标记属性
  isMod: true,
  release: '/${name}/c-$1'
}, {
  // lib文件，单独处理，不加isMod标记
  reg: /^\/assets\/lib\/(.*\.js)$/i,
  release: '/${name}/assets-lib-$1'
}, {
  reg: /.*\/(.*-work).js/,
  isMod: false,
  release: false
}, {
  reg: /^\/assets\/.*\/(.*)$/i,
  isMod: true,
  release: '/${name}/assets-$1'
}, {
  //正则匹配【/views/*.js】文件，并将views后面的路径捕获为分组1
  reg: /^\/views\/.*\/(.*\.js)$/i,
  isMod: true,
  release: '/${name}/v-$1'
}, {
  //正则匹配【/views/*.html】文件，并将views后面的路径捕获为分组1
  reg: /^\/views\/.*\/(.*\.html)$/i,
  useMap: true,
  isViews: true,
  release: '/${name}/$1'
}, {
  //正则匹配【/views/**】文件，并将views后面的路径捕获为分组1
  reg: /^\/views\/.*\/(.css)$/i,
  useMap: true,
  //发布到 /name/version/分组1 路径下
  release: '/${name}/v-$1',
  useSprite: true //为所有样式资源开启csssprites
}, {
  //正则匹配【/views/**】文件，并将views后面的路径捕获为分组1
  reg: /^\/views\/.*\/(.*)$/i,
  //发布到 /name/version/分组1 路径下
  useMap: true,
  useSprite: true,
  release: '/${name}/v-$1',
}, {
  //其他文件就不属于前端项目了，比如nodejs的后端代码
  //不处理这些文件的资源定位替换（useStandard: false）
  //也不用对这些资源进行压缩(useOptimizer: false)
  reg: '**',
  useStandard: false,
  useOptimizer: false,
}]);
//插件与配置
fis.config.merge({
  modules: {
    lint: {
      js: 'jshint',
      css: 'csslint'
    },
    postpackager: ['autoload', 'simple', 'inline', 'htmlmin']
      // postpackager: ['autoload', 'simple']
  },
  settings: {
    postprocessor: {
      jswrapper: {
        type: 'amd'
      }
    },
    postpackager: {
      htmlmin: {
        minifyJS: false
      },
      autoload: {
        useSiteMap: false,
        pageSubPath: 'apm-h5/map.js'
      },
      simple: {
        //开始autoCombine可以将零散资源进行自动打包
        //开启autoReflow使得在关闭autoCombine的情况下，依然会优化脚本与样式资源引用位置
        autoCombine: true,
        autoReflow: true,
        // headTag: '<!--HEAD_END-->',
        output: 'apm-h5/auto_combine_${hash}'
      },
      inline: {
        exclude: [
          /.*common\.js/i
        ]
      }
    },
    spriter: {
      csssprites: {
        htmlUseSprite: true,
        margin: 86, //设置csssprites的合并间距
        scale: 0.33
      }
    },
    optimizer: {
      'png-compressor': {
        type: 'pngquant' //default is pngcrush
      },
      'uglify-js': {
        compress: {
          drop_console: true
        }
      }
    },
    lint: {
      jshint: {
        ignored: ['assets/lib/**.js'],
      }
    }
  },
  // app-list虽然不是全部页面引用，但主要页面用了，所以合在一起
  pack: {
    'apm-h5/common.js': [
      '/assets/lib/**.js',
      '/assets/js/global.js',
      '/assets/js/module/lazyload.js',
      '/assets/js/module/dom.js',
      '/assets/js/module/domLazy.js',
      '/assets/js/module/query.js',
      '/assets/js/module/render.js',
      '/assets/js/module/tap.js',
      '/components/load/load.js',
      '/assets/js/scrollEvent.js',
      '/assets/js/scrollBottomEvent.js',
      '/assets/js/request.js',
      '/assets/js/lang/lang.js'
    ]
  },
  deploy: {
    local: {
      //from参数省略，表示从发布后的根目录开始上传
      //发布到当前项目的上一级的output目录中
      // from: '/apm-h5',
      to: '../output',
      //通配或正则过滤文件，匹配的是处理后的id，表示只上传所有的js文件
      exclude: [
          /.*\.sprite\.png|\/mock\//i,
          /assets-.*\.js/i,
          /assets-.*\.css/i,
          /c-.*\.js/i,
          /c-.*\.css/i,
          /v-.*\.js$/i,
          /v-.*\.css/i,
          /c-load\.js/i
        ]
        //widget目录下的那些文件就不要发布了
        // exclude : /\/mock\//i,
        //支持对文件进行字符串替换
        // replace : {
        //     from : '/apm-h5/',
        //     to : ''
        // }
    }
  }
});
