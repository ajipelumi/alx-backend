#!/usr/bin/env python3
""" Basic Flask app with Babel setup. """
from flask import Flask, render_template, request, g
from flask_babel import Babel
from typing import Dict


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
    # Check locale from URL parameters
    locale = request.args.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale

    # Check locale from user settings
    locale = g.user
    if locale and locale.get('locale') in Config.LANGUAGES:
        return locale.get('locale')

    # Check locale from request header
    locale = request.headers.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale

    # Return default locale
    return request.accept_languages.best_match(Config.LANGUAGES)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(login_as: int) -> Dict:
    """ Get user from users. """
    if login_as in users:
        return users.get(login_as)
    return None


@app.before_request
def before_request() -> None:
    """ Before request handler. """
    login = request.args.get('login_as', None)
    if login:
        user = get_user(int(login))
        g.user = user
    else:
        g.user = None


@app.route('/')
def index() -> str:
    """ Basic Flask app. """
    return render_template('6-index.html', user=g.user)


if __name__ == '__main__':
    app.run()
