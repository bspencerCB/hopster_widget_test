requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: [
      'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min',
      'https://code.jquery.com/jquery-3.1.1.min',
      'jquery.min'
    ]
  }
});

requirejs(["main.min"]);

