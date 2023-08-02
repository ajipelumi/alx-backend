#!/usr/bin/env python3
""" Basic Flask app with Babel setup. """
from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime
from typing import Dict
from datetime import datetime, timedelta
import pytz


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


@babel.timezoneselector
def get_timezone() -> str:
    """ Get timezone. """
    # Check timezone from URL parameters
    timezone = request.args.get('timezone')
    if timezone:
        try:
            return pytz.timezone(timezone)
        except Exception:
            pass

    # Check timezone from user settings
    timezone = g.user
    if timezone:
        try:
            return pytz.timezone(timezone.get('timezone'))
        except Exception:
            pass

    # Return default timezone
    return app.config.get('BABEL_DEFAULT_TIMEZONE')


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
    current_time_utc = datetime.now() - timedelta(days=150)
    user_timezone = get_timezone()
    if user_timezone == 'UTC':
        current_time = current_time_utc
    else:
        current_time = current_time_utc.astimezone(user_timezone)

    locale = get_locale()
    if locale == 'fr':
        # Format for French locale: 21 janv. 2020 à 05:56:28
        format_fr = '%d %b %Y à %H:%M:%S'
        current_time = current_time.strftime(format_fr)
    else:
        # Default format for English locale: Jan 21, 2020, 5:55:39 AM
        format_en = '%b %d, %Y, %I:%M:%S %p'
        current_time = current_time.strftime(format_en)

    return render_template('index.html', user=g.user, time=current_time)


if __name__ == '__main__':
    app.run()
