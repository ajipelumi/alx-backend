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
    locale = request.args.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def index() -> str:
    """ Basic Flask app. """
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run()
