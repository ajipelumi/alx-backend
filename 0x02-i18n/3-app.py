#!/usr/bin/env python3
""" Basic Flask app with Babel setup. """
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)


class Config():
    """ Babel config class. """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


babel = Babel(app)
app.config.from_object(Config)


@babel.localeselector
def get_locale() -> str:
    """ Get locale language code. """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """ Basic Flask app. """
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run()
