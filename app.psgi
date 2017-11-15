use strict;
use warnings;
use Plack::Request;
use Plack::App::File;

use Plack::Builder;
builder {
    mount "/static" => Plack::App::File->new(root => "static/")->to_app;
    mount "/" => Plack::App::File->new(file => "static/viz.html")->to_app;
};

