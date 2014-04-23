var app = require('derby').createApp(module)
    .use(require('../../ui'));
var marked = require('marked');

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  var result = '<h' + level + ' id=' + escapedText + '>' + text + '</h' + level + '>';
  if (level == 2) {
	result += '<hr>';
  }
  return result;
};

// ROUTES //

// Derby routes are rendered on the client and the server
app.get('/', function (page, model) {
    var id = model.add('documents', {title: 'New Document', markdown: ''});
    page.redirect('/document/' + id);
});

app.get('/document/:id', function (page, model, params, next) {
    var document = model.at('documents.' + params.id);

    // Get the initial data and subscribe to any updates
    document.subscribe(function (err) {
        if (err) return next(err);

        // Create references that can be used in templates or controller methods
        model.ref('_page.document', document);

        page.render('document');
    });
});


// CONTROLLER FUNCTIONS //

app.view.fn('marked', function (markdown) {
    return marked(markdown, { renderer: renderer });
});
