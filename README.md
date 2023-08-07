<img src="https://github.com/jarehec/AirBnB_clone_v3/blob/master/dev/HBTN-hbnb-Final.png" width="160" height=auto />

# AirBnB Clone: Phase # 3

: API with Swagger

## Description

Project attempts to clone the the AirBnB application and website, including the
database, storage, RESTful API, Web Framework, and Front End.  Currently the
application is designed to run with 2 storage engine models:

* File Storage Engine:

  * `/models/engine/file_storage.py`

* Database Storage Engine:

  * `/models/engine/db_storage.py`

  * To Setup the DataBase for testing and development, there are 2 setup
  scripts that setup a database with certain privileges: `setup_mysql_test.sql`
  & `setup_mysql_test.sql` (for more on setup, see below).

  * The Database uses Environmental Variables for tests.  To execute tests with
  the environmental variables prepend these declarations to the execution
  command:

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
[COMMAND HERE]
```

## Environment

* __OS:__ Ubuntu 14.04 LTS
* __language:__ Python 3.4.3
* __web server:__ nginx/1.4.6
* __application server:__ Flask 0.12.2, Jinja2 2.9.6
* __web server gateway:__ gunicorn (version 19.7.1)
* __database:__ mysql Ver 14.14 Distrib 5.7.18
* __documentation:__ Swagger (flasgger==0.6.6)
* __style:__
  * __python:__ PEP 8 (v. 1.7.0)
  * __web static:__ [W3C Validator](https://validator.w3.org/)
  * __bash:__ ShellCheck 0.3.3

<img src="https://github.com/jarehec/AirBnB_clone_v3/blob/master/dev/hbnb_step5.png" />

## Configuration Files

The `/config/` directory contains configuration files for `nginx` and the
Upstart scripts.  The nginx configuration file is for the configuration file in
the path: `/etc/nginx/sites-available/default`.  The enabled site is a sym link
to that configuration file.  The upstart script should be saved in the path:
`/etc/init/[FILE_NAME.conf]`.  To begin this service, execute:

```
$ sudo start airbnb.conf
```
This script's main task is to execute the following `gunicorn` command:

```
$ gunicorn --bind 127.0.0.1:8001 wsgi.wsgi:web_flask.app
```

The `gunicorn` command starts an instance of a Flask Application.

---

### Web Server Gateway Interface (WSGI)

All integration with gunicorn occurs with `Upstart` `.conf` files.  The python
code for the WSGI is listed in the `/wsgi/` directory.  These python files run
the designated Flask Application.

## Setup

This project comes with various setup scripts to support automation, especially
during maintanence or to scale the entire project.  The following files are the
setupfiles along with a brief explanation:

* **`dev/setup.sql`:** Drops test and dev databases, and then reinitializes
the datbase.

  * Usage: `$ cat dev/setup.sql | mysql -uroot -p`

* **`setup_mysql_dev.sql`:** initialiezs dev database with mysql for testing

  * Usage: `$ cat setup_mysql_dev.sql | mysql -uroot -p`

* **`setup_mysql_test.sql`:** initializes test database with mysql for testing

  * Usage: `$ cat setup_mysql_test.sql | mysql -uroot -p`

* **`0-setup_web_static.sh`:** sets up nginx web server config file & the file
  structure.

  * Usage: `$ sudo ./0-setup_web_static.sh`

* **`3-deploy_web_static.py`:** uses 2 functions from (1-pack_web_static.py &
  2-do_deploy_web_static.py) that use the fabric3 python integration, to create
  a `.tgz` file on local host of all the local web static fils, and then calls
  the other function to deploy the compressed web static files.  Command must
  be executed from the `AirBnB_clone` root directory.

  * Usage: `$ fab -f 3-deploy_web_static.py deploy -i ~/.ssh/holberton -u ubuntu`

## Testing

### `unittest`

This project uses python library, `unittest` to run tests on all python files.
All unittests are in the `./tests` directory with the command:

* File Storage Engine Model:

  * `$ python3 -m unittest discover -v ./tests/`

* DataBase Storage Engine Model

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
python3 -m unittest discover -v ./tests/
```

---

### All Tests

The bash script `init_test.sh` executes all these tests for both File Storage &
DataBase Engine Models:

  * checks `pep8` style

  * runs all unittests

  * runs all w3c_validator tests

  * cleans up all `__pycache__` directories and the storage file, `file.json`

  * **Usage `init_test.sh`:**

```
$ ./dev/init_test.sh
```

---

### CLI Interactive Tests

* This project uses python library, `cmd` to run tests in an interactive command
  line interface.  To begin tests with the CLI, run this script:

#### File Storage Engine Model

```
$ ./console.py
```

#### To execute the CLI using the Database Storage Engine Model:

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
./console.py
```

#### For a detailed description of all tests, run these commands in the CLI:

```
(hbnb) help help
List available commands with "help" or detailed help with "help cmd".
(hbnb) help

Documented commands (type help <topic>):
========================================
Amenity    City  Place   State  airbnb  create   help  show
BaseModel  EOF   Review  User   all     destroy  quit  update

(hbnb) help User
class method with .function() syntax
        Usage: User.<command>(<id>)
(hbnb) help create
create: create [ARG] [PARAM 1] [PARAM 2] ...
        ARG = Class Name
        PARAM = <key name>=<value>
                value syntax: "<value>"
        SYNOPSIS: Creates a new instance of the Class from given input ARG
                  and PARAMS. Key in PARAM = an instance attribute.
        EXAMPLE: create City name="Chicago"
                 City.create(name="Chicago")
```

* Tests in the CLI may also be executed with this syntax:

  * **destroy:** `<class name>.destroy(<id>)`

  * **update:** `<class name>.update(<id>, <attribute name>, <attribute value>)`

  * **update with dictionary:** `<class name>.update(<id>,
    <dictionary representation>)`

---

### Continuous Integration Tests

Uses [Travis-CI](https://travis-ci.org/) to run all tests on all commits to the
github repo

# AirBnB Clone: Phase # 4

<img src="https://s3.amazonaws.com/intranet-projects-files/concepts/74/hbnb_step5.png" />

: Web dynamic

## Description of features added/updated and what we accomplished:
* make requests to our own API from the front using Ajax
* modify multiple HTML element styles with mix of Javascript and Jquery
* get and update multiple HTML element contents from our database
* manipulate the DOM for better dynamic experience
* use Jquery Ajax to make GET and POST requests to our backend
* listen/bind to DOM events
* listen/bind to user events
* make sure that HTML will not reload for each action: DOM manipulation, update values, fetch d\
ata from the front

## Environment
* All Javascript/Jquery scripts is fully compliant to `semistandard` with the flag `--global $`:
  `semistandard *.js --global $`
* Jquery is version 3.x
* Interpreted and debugged on Chrome(version 57.0)

## Primary Folder
* Added `web_dynamic` directory which includes all Javascript files under `scripts` directory and Jinja HTML templates under `templates` directory

## Files **Tree structure of all files and directory at the bottom**
---
File|Task
---|---
0-hbnb.py, templates/0-hbnb.html | Script that starts our Flask web application
1-hbnb.py, templates/1-hbnb.html, static/scripts/1-hbnb.js | Update filters section with added checkbox to listen for input and convert static to dynamic contents when the DOM is loaded
api/v1/app.py, web_dynamic/2-hbnb.py, web_dynamic/templates/2-hbnb.html, web_dynamic/static/styles/3-header.css, web_dynamic/static/scripts/2-hbnb.js | Make requests to HBNB API to get status, update API entry point by changing routes with our app.py, create new HTML template with dynamic contents, CSS elements with Jquery 
web_dynamic/3-hbnb.py, web_dynamic/templates/3-hbnb.html, web_dynamic/static/scripts/3-hbnb.js | Created new template based on previous one and updated for new features to fetch all places through Ajax requests to our backend, styled with Jquery Javascript script   
web_dynamic/4-hbnb.py, web_dynamic/templates/4-hbnb.html, web_dynamic/static/scripts/4-hbnb.js | Updated route to new Jinja template and added new `BUTTON` tag for when click, send a `POST` requests to places_search related to lists of Amenities checked
web_dynamic/100-hbnb.py, web_dynamic/templates/100-hbnb.html, web_dynamic/static/scripts/100-hbnb.js | updated template with checkbox next to each state and city so that when checked, Ajax will send `POST` request to display all places related to checked items

## To test please:
```
# expose port 5000 to port 5001 in your vm's config file: forward_port, guest: 5000, host: 5001
```
It’s important to test our AirBnB API with the port 5001 and have the latest browser version
* `Follow instructions above to load data into MySQL databasesd
* Run this command to start front side Flask web application
```
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db python3 -m web_dynamic.0-hbnb
```
* Run this command to start back end engine
```
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db HBNB_API_PORT=5001 python3 -m api.v1.app
```
* Start your `Chrome` browser and input url below and press enter:
```
http://0.0.0.0:5001/api/v1/status/
```
* Hover mouse over `States` or `Amenities`, check any checkbox and press `Search`

## Authors

* MJ Johnson, [@mj31508](https://github.com/mj31508)
* David John Coleman II, [davidjohncoleman.com](http://www.davidjohncoleman.com/) | [@djohncoleman](https://twitter.com/djohncoleman)
* Kimberly Wong, [kjowong](https://github.com/kjowong) | [@kjowong](https://twitter.com/kjowong) | [kjowong@gmail.com](kjowong@gmail.com)
* Carrie Ybay, [hicarrie](https://github.com/hicarrie) | [@hicarrie_](https://twitter.com/hicarrie_)
* Jared Heck, [jarehec](https://github.com/jarehec) | [@jarehec](https://twitter.com/jarehec)
* Heindrick Cheung, [hcheung01](https://github.com/hcheung01) | [@HeindrickCheung](https://twitter.com/HeindrickCheung)
* Stephen Chu, [stephenchu530](https://github.com/stephenchu530) | [@StephenChu530](https://twitter.com/StephenChu530)

## License

MIT License

```
.
├── 0-setup_web_static.sh
├── 1-pack_web_static.py
├── 2-do_deploy_web_static.py
├── 3-deploy_web_static.py
├── api
│   ├── __init__.py
│   ├── __pycache__
│   │   └── __init__.cpython-34.pyc
│   ├── README.md
│   └── v1
│       ├── app.py
│       ├── __init__.py
│       ├── __pycache__
│       │   ├── app.cpython-34.pyc
│       │   └── __init__.cpython-34.pyc
│       └── views
│           ├── amenities.py
│           ├── cities.py
│           ├── index.py
│           ├── __init__.py
│           ├── places_amenities.py
│           ├── places.py
│           ├── places_reviews.py
│           ├── __pycache__
│           │   ├── amenities.cpython-34.pyc
│           │   ├── cities.cpython-34.pyc
│           │   ├── index.cpython-34.pyc
│           │   ├── __init__.cpython-34.pyc
│           │   ├── places_amenities.cpython-34.pyc
│           │   ├── places.cpython-34.pyc
│           │   ├── places_reviews.cpython-34.pyc
│           │   ├── states.cpython-34.pyc
│           │   └── users.cpython-34.pyc
│           ├── states.py
│           ├── swagger_yaml
│           │   ├── amenities_id.yml
│           │   ├── amenities_no_id.yml
│           │   ├── cities_by_state.yml
│           │   ├── cities_id.yml
│           │   ├── places_by_city.yml
│           │   ├── places_id.yml
│           │   ├── reviews_by_place.yml
│           │   ├── reviews_id.yml
│           │   ├── states_id.yml
│           │   ├── states_no_id.yml
│           │   ├── users_id.yml
│           │   └── users_no_id.yml
│           └── users.py
├── AUTHORS
├── code_review.txt
├── console.py
├── dev
│   ├── AirBnb_DB_diagramm.jpg
│   ├── backup_json_file_with_various_models.json
│   ├── db
│   │   ├── 100-dump.sql
│   │   ├── 10-dump.sql
│   │   ├── 7-dump.sql
│   │   ├── drop_recreate_dev_test_db.sql
│   │   └── setup_db_tables_all_classes.sql
│   ├── edit_at_scale
│   │   ├── rename_files.sh
│   │   └── replace_lines.py
│   ├── hbnb_step5.png
│   ├── HBTN-hbnb-Final.png
│   ├── hbtn_tests
│   │   ├── start_server_with_db.sh
│   │   ├── start_server_with_db.sh.1
│   │   ├── test_base_model_dict.py
│   │   ├── test_base_model.py
│   │   ├── test_bm_args_params.py
│   │   ├── test_get_count.py
│   │   ├── test_params_create
│   │   ├── test_save_reload_base_model.py
│   │   └── test_save_reload_user.py
│   ├── init_test.sh
│   ├── setup_server.bash
│   ├── ssh_function_rewrite.sh
│   ├── travis_init_test.sh
│   ├── unittests_for_fabric
│   │   ├── test_deploy_web_static.py
│   │   ├── test_do_deploy_web_static.py
│   │   └── test_pack_web_static.py
│   └── w3c_validator.py
├── etc
│   ├── haproxy
│   │   └── haproxy.cfg
│   ├── nginx
│   │   └── default
│   └── upstart
│       ├── airbnb_6.conf
│       ├── airbnb_api.conf
│       ├── airbnb.conf
│       └── airbnb_hbnb.conf
├── file.txt
├── LICENSE
├── models
│   ├── amenity.py
│   ├── base_model.py
│   ├── city.py
│   ├── engine
│   │   ├── db_storage.py
│   │   ├── file_storage.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   │       ├── db_storage.cpython-34.pyc
│   │       ├── file_storage.cpython-34.pyc
│   │       └── __init__.cpython-34.pyc
│   ├── __init__.py
│   ├── place.py
│   ├── __pycache__
│   │   ├── amenity.cpython-34.pyc
│   │   ├── base_model.cpython-34.pyc
│   │   ├── city.cpython-34.pyc
│   │   ├── __init__.cpython-34.pyc
│   │   ├── place.cpython-34.pyc
│   │   ├── review.cpython-34.pyc
│   │   ├── state.cpython-34.pyc
│   │   └── user.cpython-34.pyc
│   ├── review.py
│   ├── state.py
│   └── user.py
├── README.md
├── requirements.txt
├── setup_mysql_dev.sql
├── setup_mysql_test.sql
├── tests
│   ├── __init__.py
│   ├── test_api
│   │   ├── __init__.py
│   │   ├── test_app.py
│   │   └── test_v1
│   │       ├── __init__.py
│   │       ├── test_app.py
│   │       └── test_views
│   │           ├── __init__.py
│   │           ├── test_amenities.py
│   │           ├── test_cities.py
│   │           ├── test_index.py
│   │           ├── test_places.py
│   │           ├── test_places_reviews.py
│   │           └── test_states.py
│   ├── test_console.py
│   ├── test_models
│   │   ├── __init__.py
│   │   ├── test_amenity.py
│   │   ├── test_base_model.py
│   │   ├── test_city.py
│   │   ├── test_engine
│   │   │   ├── __init__.py
│   │   │   ├── test_db_storage.py
│   │   │   └── test_file_storage.py
│   │   ├── test_place.py
│   │   ├── test_review.py
│   │   ├── test_state.py
│   │   └── test_user.py
│   └── test_web_flask
│       ├── __init__.py
│       ├── test_cities_by_states.py
│       ├── test_c_route.py
│       ├── test_hbnb_route.py
│       ├── test_hello_route.py
│       ├── test_number_odd_or_even.py
│       ├── test_number_route.py
│       ├── test_number_template.py
│       ├── test_python_route.py
│       ├── test_states_list.py
│       └── test_states.py
├── web_dynamic
│   ├── 0-hbnb.py
│   ├── 100-hbnb.py
│   ├── 101-hbnb.py
│   ├── 101-hbnb.py~
│   ├── 1-hbnb.py
│   ├── 2-hbnb.py
│   ├── 3-hbnb.py
│   ├── 4-hbnb.py
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── 0-hbnb.cpython-34.pyc
│   │   ├── 3-hbnb.cpython-34.pyc
│   │   ├── 4-hbnb.cpython-34.pyc
│   │   └── __init__.cpython-34.pyc
│   ├── static
│   │   ├── images
│   │   │   ├── icon.png
│   │   │   └── logo.png
│   │   ├── scripts
│   │   │   ├── 100-hbnb.js
│   │   │   ├── 1-hbnb.js
│   │   │   ├── 2-hbnb.js
│   │   │   ├── 3-hbnb.js
│   │   │   ├── 4-hbnb.js
│   │   │   └── 4-hbnb.js~
│   │   └── styles
│   │       ├── 3-footer.css
│   │       ├── 3-header.css
│   │       ├── 4-common.css
│   │       ├── 6-filters.css
│   │       ├── 8-places.css
│   │       ├── Font-Awesome
│   │       │   ├── css
│   │       │   │   └── font-awesome.css
│   │       │   ├── fonts
│   │       │   │   ├── FontAwesome.otf
│   │       │   │   ├── fontawesome-webfont.eot
│   │       │   │   ├── fontawesome-webfont.svg
│   │       │   │   ├── fontawesome-webfont.ttf
│   │       │   │   ├── fontawesome-webfont.woff
│   │       │   │   └── fontawesome-webfont.woff2
│   │       │   ├── less
│   │       │   │   ├── animated.less
│   │       │   │   ├── bordered-pulled.less
│   │       │   │   ├── core.less
│   │       │   │   ├── fixed-width.less
│   │       │   │   ├── font-awesome.less
│   │       │   │   ├── icons.less
│   │       │   │   ├── larger.less
│   │       │   │   ├── list.less
│   │       │   │   ├── mixins.less
│   │       │   │   ├── path.less
│   │       │   │   ├── rotated-flipped.less
│   │       │   │   ├── screen-reader.less
│   │       │   │   ├── stacked.less
│   │       │   │   └── variables.less
│   │       │   ├── scss
│   │       │   │   ├── _animated.scss
│   │       │   │   ├── _bordered-pulled.scss
│   │       │   │   ├── _core.scss
│   │       │   │   ├── _fixed-width.scss
│   │       │   │   ├── font-awesome.scss
│   │       │   │   ├── _icons.scss
│   │       │   │   ├── _larger.scss
│   │       │   │   ├── _list.scss
│   │       │   │   ├── _mixins.scss
│   │       │   │   ├── _path.scss
│   │       │   │   ├── _rotated-flipped.scss
│   │       │   │   ├── _screen-reader.scss
│   │       │   │   ├── _stacked.scss
│   │       │   │   └── _variables.scss
│   │       │   └── src
│   │       │       ├── 3.2.1
│   │       │       │   ├── assets
│   │       │       │   │   ├── css
│   │       │       │   │   │   ├── prettify.css
│   │       │       │   │   │   ├── pygments.css
│   │       │       │   │   │   └── site.css
│   │       │       │   │   ├── font-awesome
│   │       │       │   │   │   ├── css
│   │       │       │   │   │   │   ├── font-awesome.css
│   │       │       │   │   │   │   ├── font-awesome-ie7.css
│   │       │       │   │   │   │   ├── font-awesome-ie7.min.css
│   │       │       │   │   │   │   └── font-awesome.min.css
│   │       │       │   │   │   ├── font
│   │       │       │   │   │   │   ├── FontAwesome.otf
│   │       │       │   │   │   │   ├── fontawesome-webfont.eot
│   │       │       │   │   │   │   ├── fontawesome-webfont.svg
│   │       │       │   │   │   │   ├── fontawesome-webfont.ttf
│   │       │       │   │   │   │   └── fontawesome-webfont.woff
│   │       │       │   │   │   ├── less
│   │       │       │   │   │   │   ├── bootstrap.less
│   │       │       │   │   │   │   ├── core.less
│   │       │       │   │   │   │   ├── extras.less
│   │       │       │   │   │   │   ├── font-awesome-ie7.less
│   │       │       │   │   │   │   ├── font-awesome.less
│   │       │       │   │   │   │   ├── icons.less
│   │       │       │   │   │   │   ├── mixins.less
│   │       │       │   │   │   │   ├── path.less
│   │       │       │   │   │   │   └── variables.less
│   │       │       │   │   │   └── scss
│   │       │       │   │   │       ├── _bootstrap.scss
│   │       │       │   │   │       ├── _core.scss
│   │       │       │   │   │       ├── _extras.scss
│   │       │       │   │   │       ├── font-awesome-ie7.scss
│   │       │       │   │   │       ├── font-awesome.scss
│   │       │       │   │   │       ├── _icons.scss
│   │       │       │   │   │       ├── _mixins.scss
│   │       │       │   │   │       ├── _path.scss
│   │       │       │   │   │       └── _variables.scss
│   │       │       │   │   ├── font-awesome.zip
│   │       │       │   │   ├── ico
│   │       │       │   │   │   └── favicon.ico
│   │       │       │   │   ├── img
│   │       │       │   │   │   ├── contribution-sample.png
│   │       │       │   │   │   ├── fort_awesome.jpg
│   │       │       │   │   │   ├── glyphicons-halflings.png
│   │       │       │   │   │   ├── glyphicons-halflings-white.png
│   │       │       │   │   │   └── icon-flag.pdf
│   │       │       │   │   ├── js
│   │       │       │   │   │   ├── backbone.min.js
│   │       │       │   │   │   ├── bootstrap-222.min.js
│   │       │       │   │   │   ├── bootstrap-2.3.1.min.js
│   │       │       │   │   │   ├── jquery-1.7.1.min.js
│   │       │       │   │   │   ├── prettify.min.js
│   │       │       │   │   │   ├── site.js
│   │       │       │   │   │   ├── underscore.min.js
│   │       │       │   │   │   ├── ZeroClipboard-1.1.7.min.js
│   │       │       │   │   │   └── ZeroClipboard-1.1.7.swf
│   │       │       │   │   └── less
│   │       │       │   │       ├── bootstrap-2.3.2
│   │       │       │   │       │   ├── accordion.less
│   │       │       │   │       │   ├── alerts.less
│   │       │       │   │       │   ├── bootstrap.less
│   │       │       │   │       │   ├── breadcrumbs.less
│   │       │       │   │       │   ├── button-groups.less
│   │       │       │   │       │   ├── buttons.less
│   │       │       │   │       │   ├── carousel.less
│   │       │       │   │       │   ├── close.less
│   │       │       │   │       │   ├── code.less
│   │       │       │   │       │   ├── component-animations.less
│   │       │       │   │       │   ├── dropdowns.less
│   │       │       │   │       │   ├── forms.less
│   │       │       │   │       │   ├── grid.less
│   │       │       │   │       │   ├── hero-unit.less
│   │       │       │   │       │   ├── labels-badges.less
│   │       │       │   │       │   ├── layouts.less
│   │       │       │   │       │   ├── media.less
│   │       │       │   │       │   ├── mixins.less
│   │       │       │   │       │   ├── modals.less
│   │       │       │   │       │   ├── navbar.less
│   │       │       │   │       │   ├── navs.less
│   │       │       │   │       │   ├── pager.less
│   │       │       │   │       │   ├── pagination.less
│   │       │       │   │       │   ├── popovers.less
│   │       │       │   │       │   ├── progress-bars.less
│   │       │       │   │       │   ├── reset.less
│   │       │       │   │       │   ├── responsive-1200px-min.less
│   │       │       │   │       │   ├── responsive-767px-max.less
│   │       │       │   │       │   ├── responsive-768px-979px.less
│   │       │       │   │       │   ├── responsive.less
│   │       │       │   │       │   ├── responsive-navbar.less
│   │       │       │   │       │   ├── responsive-utilities.less
│   │       │       │   │       │   ├── scaffolding.less
│   │       │       │   │       │   ├── sprites.less
│   │       │       │   │       │   ├── tables.less
│   │       │       │   │       │   ├── thumbnails.less
│   │       │       │   │       │   ├── tooltip.less
│   │       │       │   │       │   ├── type.less
│   │       │       │   │       │   ├── utilities.less
│   │       │       │   │       │   ├── variables.less
│   │       │       │   │       │   └── wells.less
│   │       │       │   │       ├── lazy.less
│   │       │       │   │       ├── mixins.less
│   │       │       │   │       ├── responsive-1200px-min.less
│   │       │       │   │       ├── responsive-767px-max.less
│   │       │       │   │       ├── responsive-768px-979px.less
│   │       │       │   │       ├── responsive.less
│   │       │       │   │       ├── responsive-navbar.less
│   │       │       │   │       ├── site.less
│   │       │       │   │       ├── sticky-footer.less
│   │       │       │   │       └── variables.less
│   │       │       │   ├── cheatsheet
│   │       │       │   │   └── index.html
│   │       │       │   ├── CNAME
│   │       │       │   ├── community
│   │       │       │   │   └── index.html
│   │       │       │   ├── design.html
│   │       │       │   ├── examples
│   │       │       │   │   └── index.html
│   │       │       │   ├── get-started
│   │       │       │   │   └── index.html
│   │       │       │   ├── icon
│   │       │       │   │   ├── adjust
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── adn
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-center
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-justify
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ambulance
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── anchor
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── android
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── apple
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── archive
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── asterisk
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── backward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ban-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bar-chart
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── barcode
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── beaker
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── beer
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bell
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bell-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bitbucket
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bitbucket-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bold
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bolt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── book
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bookmark
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bookmark-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── briefcase
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── btc
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bug
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── building
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bullhorn
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bullseye
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── calendar
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── calendar-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── camera
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── camera-retro
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── certificate
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check-minus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-blank
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cloud
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cloud-download
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cloud-upload
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cny
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── code
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── code-fork
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── coffee
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cog
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cogs
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── collapse
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── collapse-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── collapse-top
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── columns
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comment
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comment-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comments
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comments-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── compass
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── copy
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── credit-card
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── crop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── css3
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cut
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── dashboard
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── desktop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── download
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── download-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── dribbble
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── dropbox
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── edit
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── edit-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eject
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ellipsis-horizontal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ellipsis-vertical
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── envelope
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── envelope-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eraser
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eur
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── exchange
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── exclamation
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── exclamation-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── expand
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── expand-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── external-link
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── external-link-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eye-close
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eye-open
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── facebook
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── facebook-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── facetime-video
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fast-backward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fast-forward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── female
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fighter-jet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file-text
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file-text-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── film
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── filter
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fire
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fire-extinguisher
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flag
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flag-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flag-checkered
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flickr
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-close
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-close-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-open
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-open-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── font
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── food
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── forward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── foursquare
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── frown
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fullscreen
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gamepad
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gbp
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gift
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── github
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── github-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── github-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gittip
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── glass
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── globe
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── google-plus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── google-plus-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── group
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hdd
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── headphones
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── heart
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── heart-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── home
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hospital
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── h-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── html5
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── inbox
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── indent-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── indent-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── info
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── info-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── inr
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── instagram
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── italic
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── jpy
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── key
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── keyboard
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── krw
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── laptop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── leaf
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── legal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── lemon
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── level-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── level-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── lightbulb
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── link
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── linkedin
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── linkedin-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── linux
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list-ol
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list-ul
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── location-arrow
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── lock
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── magic
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── magnet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── mail-reply-all
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── male
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── map-marker
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── maxcdn
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── medkit
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── meh
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── microphone
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── microphone-off
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── minus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── minus-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── minus-sign-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── mobile-phone
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── money
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── moon
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── move
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── music
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── off
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ok
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ok-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ok-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── paper-clip
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── paste
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pause
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pencil
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── phone
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── phone-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── picture
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pinterest
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pinterest-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plane
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── play
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── play-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── play-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plus-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plus-sign-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── print
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pushpin
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── puzzle-piece
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── qrcode
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── question
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── question-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── quote-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── quote-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── random
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── refresh
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── remove
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── remove-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── remove-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── renren
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── reorder
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── repeat
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── reply
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── reply-all
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-full
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-horizontal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-small
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-vertical
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── retweet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── road
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── rocket
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── rss
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── rss-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── save
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── screenshot
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── search
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── share
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── share-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── share-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── shield
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── shopping-cart
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── signal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sign-blank
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── signin
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── signout
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sitemap
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── skype
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── smile
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-alphabet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-alphabet-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-attributes
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-attributes-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-order
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-order-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── spinner
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── stackexchange
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star-half
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star-half-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── step-backward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── step-forward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── stethoscope
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── stop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── strikethrough
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── subscript
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── suitcase
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sun
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── superscript
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── table
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tablet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tag
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tags
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tasks
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── terminal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── text-height
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── text-width
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── th
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── th-large
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── th-list
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-down-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-up-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ticket
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── time
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tint
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── trash
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── trello
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── trophy
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── truck
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tumblr
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tumblr-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── twitter
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── twitter-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── umbrella
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── underline
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── undo
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── unlink
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── unlock
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── unlock-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── upload
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── upload-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── usd
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── user
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── user-md
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── vk
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── volume-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── volume-off
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── volume-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── warning-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── weibo
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── windows
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── wrench
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── xing
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── xing-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── youtube
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── youtube-play
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── youtube-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── zoom-in
│   │       │       │   │   │   └── index.html
│   │       │       │   │   └── zoom-out
│   │       │       │   │       └── index.html
│   │       │       │   ├── icons
│   │       │       │   │   └── index.html
│   │       │       │   ├── icons.yml
│   │       │       │   ├── index.html
│   │       │       │   ├── license
│   │       │       │   │   └── index.html
│   │       │       │   ├── Makefile
│   │       │       │   ├── test
│   │       │       │   │   └── index.html
│   │       │       │   └── whats-new
│   │       │       │       └── index.html
│   │       │       ├── accessibility.html
│   │       │       ├── assets
│   │       │       │   ├── css
│   │       │       │   │   ├── prettify.css
│   │       │       │   │   └── pygments.css
│   │       │       │   ├── font-awesome
│   │       │       │   │   ├── fonts
│   │       │       │   │   │   ├── FontAwesome.otf
│   │       │       │   │   │   ├── fontawesome-webfont.eot
│   │       │       │   │   │   ├── fontawesome-webfont.svg
│   │       │       │   │   │   ├── fontawesome-webfont.ttf
│   │       │       │   │   │   ├── fontawesome-webfont.woff
│   │       │       │   │   │   └── fontawesome-webfont.woff2
│   │       │       │   │   ├── HELP-US-OUT.txt
│   │       │       │   │   ├── less
│   │       │       │   │   │   ├── animated.less
│   │       │       │   │   │   ├── bordered-pulled.less
│   │       │       │   │   │   ├── core.less
│   │       │       │   │   │   ├── fixed-width.less
│   │       │       │   │   │   ├── font-awesome.less
│   │       │       │   │   │   ├── icons.less
│   │       │       │   │   │   ├── larger.less
│   │       │       │   │   │   ├── list.less
│   │       │       │   │   │   ├── mixins.less
│   │       │       │   │   │   ├── path.less
│   │       │       │   │   │   ├── rotated-flipped.less
│   │       │       │   │   │   ├── screen-reader.less
│   │       │       │   │   │   ├── stacked.less
│   │       │       │   │   │   └── variables.less
│   │       │       │   │   └── scss
│   │       │       │   │       ├── _animated.scss
│   │       │       │   │       ├── _bordered-pulled.scss
│   │       │       │   │       ├── _core.scss
│   │       │       │   │       ├── _fixed-width.scss
│   │       │       │   │       ├── font-awesome.scss
│   │       │       │   │       ├── _icons.scss
│   │       │       │   │       ├── _larger.scss
│   │       │       │   │       ├── _list.scss
│   │       │       │   │       ├── _mixins.scss
│   │       │       │   │       ├── _path.scss
│   │       │       │   │       ├── _rotated-flipped.scss
│   │       │       │   │       ├── _screen-reader.scss
│   │       │       │   │       ├── _stacked.scss
│   │       │       │   │       └── _variables.scss
│   │       │       │   ├── ico
│   │       │       │   │   └── favicon.ico
│   │       │       │   ├── img
│   │       │       │   │   ├── algolia.png
│   │       │       │   │   ├── logo-themeisle.png
│   │       │       │   │   └── logo-wpbeginner.png
│   │       │       │   ├── js
│   │       │       │   │   ├── html5shiv.js
│   │       │       │   │   ├── monetization.js
│   │       │       │   │   ├── prettify.min.js
│   │       │       │   │   ├── respond.min.js
│   │       │       │   │   ├── search.js
│   │       │       │   │   ├── site.js
│   │       │       │   │   ├── ZeroClipboard-1.1.7.min.js
│   │       │       │   │   └── ZeroClipboard-1.1.7.swf
│   │       │       │   └── less
│   │       │       │       ├── bootstrap-3.3.5
│   │       │       │       │   ├── alerts.less
│   │       │       │       │   ├── badges.less
│   │       │       │       │   ├── bootstrap.less
│   │       │       │       │   ├── breadcrumbs.less
│   │       │       │       │   ├── button-groups.less
│   │       │       │       │   ├── buttons.less
│   │       │       │       │   ├── carousel.less
│   │       │       │       │   ├── close.less
│   │       │       │       │   ├── code.less
│   │       │       │       │   ├── component-animations.less
│   │       │       │       │   ├── dropdowns.less
│   │       │       │       │   ├── forms.less
│   │       │       │       │   ├── glyphicons.less
│   │       │       │       │   ├── grid.less
│   │       │       │       │   ├── input-groups.less
│   │       │       │       │   ├── jumbotron.less
│   │       │       │       │   ├── labels.less
│   │       │       │       │   ├── list-group.less
│   │       │       │       │   ├── media.less
│   │       │       │       │   ├── mixins
│   │       │       │       │   │   ├── alerts.less
│   │       │       │       │   │   ├── background-variant.less
│   │       │       │       │   │   ├── border-radius.less
│   │       │       │       │   │   ├── buttons.less
│   │       │       │       │   │   ├── center-block.less
│   │       │       │       │   │   ├── clearfix.less
│   │       │       │       │   │   ├── forms.less
│   │       │       │       │   │   ├── gradients.less
│   │       │       │       │   │   ├── grid-framework.less
│   │       │       │       │   │   ├── grid.less
│   │       │       │       │   │   ├── hide-text.less
│   │       │       │       │   │   ├── image.less
│   │       │       │       │   │   ├── labels.less
│   │       │       │       │   │   ├── list-group.less
│   │       │       │       │   │   ├── nav-divider.less
│   │       │       │       │   │   ├── nav-vertical-align.less
│   │       │       │       │   │   ├── opacity.less
│   │       │       │       │   │   ├── pagination.less
│   │       │       │       │   │   ├── panels.less
│   │       │       │       │   │   ├── progress-bar.less
│   │       │       │       │   │   ├── reset-filter.less
│   │       │       │       │   │   ├── reset-text.less
│   │       │       │       │   │   ├── resize.less
│   │       │       │       │   │   ├── responsive-visibility.less
│   │       │       │       │   │   ├── size.less
│   │       │       │       │   │   ├── tab-focus.less
│   │       │       │       │   │   ├── table-row.less
│   │       │       │       │   │   ├── text-emphasis.less
│   │       │       │       │   │   ├── text-overflow.less
│   │       │       │       │   │   └── vendor-prefixes.less
│   │       │       │       │   ├── mixins.less
│   │       │       │       │   ├── modals.less
│   │       │       │       │   ├── navbar.less
│   │       │       │       │   ├── navs.less
│   │       │       │       │   ├── normalize.less
│   │       │       │       │   ├── pager.less
│   │       │       │       │   ├── pagination.less
│   │       │       │       │   ├── panels.less
│   │       │       │       │   ├── popovers.less
│   │       │       │       │   ├── print.less
│   │       │       │       │   ├── progress-bars.less
│   │       │       │       │   ├── responsive-embed.less
│   │       │       │       │   ├── responsive-utilities.less
│   │       │       │       │   ├── scaffolding.less
│   │       │       │       │   ├── tables.less
│   │       │       │       │   ├── theme.less
│   │       │       │       │   ├── thumbnails.less
│   │       │       │       │   ├── tooltip.less
│   │       │       │       │   ├── type.less
│   │       │       │       │   ├── utilities.less
│   │       │       │       │   ├── variables.less
│   │       │       │       │   └── wells.less
│   │       │       │       ├── gandy-grid
│   │       │       │       │   ├── grid.less
│   │       │       │       │   └── mixins.less
│   │       │       │       ├── site
│   │       │       │       │   ├── algolia.less
│   │       │       │       │   ├── banner-ad.less
│   │       │       │       │   ├── bootstrap
│   │       │       │       │   │   ├── alerts.less
│   │       │       │       │   │   ├── buttons.less
│   │       │       │       │   │   ├── jumbotron.less
│   │       │       │       │   │   ├── labels.less
│   │       │       │       │   │   ├── modals.less
│   │       │       │       │   │   ├── navbar.less
│   │       │       │       │   │   ├── panels.less
│   │       │       │       │   │   ├── tooltip.less
│   │       │       │       │   │   ├── type.less
│   │       │       │       │   │   ├── variables.less
│   │       │       │       │   │   └── wells.less
│   │       │       │       │   ├── bsap-ad.less
│   │       │       │       │   ├── carbon-ad.less
│   │       │       │       │   ├── example-rating.less
│   │       │       │       │   ├── fa5.less
│   │       │       │       │   ├── feature-list.less
│   │       │       │       │   ├── fontawesome-icon-list.less
│   │       │       │       │   ├── footer.less
│   │       │       │       │   ├── jumbotron-carousel.less
│   │       │       │       │   ├── layout.less
│   │       │       │       │   ├── lazy.less
│   │       │       │       │   ├── newsletter.less
│   │       │       │       │   ├── print.less
│   │       │       │       │   ├── responsive
│   │       │       │       │   │   ├── screen-lg.less
│   │       │       │       │   │   ├── screen-md.less
│   │       │       │       │   │   ├── screen-sm.less
│   │       │       │       │   │   ├── screen-sm-up.less
│   │       │       │       │   │   └── screen-xs.less
│   │       │       │       │   ├── search.less
│   │       │       │       │   ├── social-buttons.less
│   │       │       │       │   ├── store.less
│   │       │       │       │   ├── stripe-ad.less
│   │       │       │       │   ├── sumome.less
│   │       │       │       │   ├── textured-bg.less
│   │       │       │       │   └── views.less
│   │       │       │       └── site.less
│   │       │       ├── cdn
│   │       │       │   ├── error.html
│   │       │       │   └── success.html
│   │       │       ├── cheatsheet.html
│   │       │       ├── CNAME
│   │       │       ├── community.html
│   │       │       ├── design.html
│   │       │       ├── examples.html
│   │       │       ├── get-started.html
│   │       │       ├── icons.html
│   │       │       ├── icons.yml
│   │       │       ├── _includes
│   │       │       │   ├── accessibility
│   │       │       │   │   ├── accessibility-facdn.html
│   │       │       │   │   ├── accessibility-manual.html
│   │       │       │   │   ├── background.html
│   │       │       │   │   ├── cta-cdn-ally.html
│   │       │       │   │   └── other.html
│   │       │       │   ├── ads
│   │       │       │   │   └── carbon.html
│   │       │       │   ├── brand-adblock-warning.html
│   │       │       │   ├── brand-license.html
│   │       │       │   ├── code
│   │       │       │   │   ├── core.less
│   │       │       │   │   ├── core.scss
│   │       │       │   │   └── license.css
│   │       │       │   ├── community
│   │       │       │   │   ├── getting-support.html
│   │       │       │   │   ├── project-milestones.html
│   │       │       │   │   ├── reporting-bugs.html
│   │       │       │   │   ├── requesting-new-icons.html
│   │       │       │   │   └── submitting-pull-requests.html
│   │       │       │   ├── examples
│   │       │       │   │   ├── accessible.html
│   │       │       │   │   ├── animated.html
│   │       │       │   │   ├── basic.html
│   │       │       │   │   ├── bootstrap.html
│   │       │       │   │   ├── bordered-pulled.html
│   │       │       │   │   ├── custom.html
│   │       │       │   │   ├── fixed-width.html
│   │       │       │   │   ├── larger.html
│   │       │       │   │   ├── list.html
│   │       │       │   │   ├── rotated-flipped.html
│   │       │       │   │   └── stacked.html
│   │       │       │   ├── footer.html
│   │       │       │   ├── icons
│   │       │       │   │   ├── accessibility.html
│   │       │       │   │   ├── brand.html
│   │       │       │   │   ├── chart.html
│   │       │       │   │   ├── currency.html
│   │       │       │   │   ├── directional.html
│   │       │       │   │   ├── file-type.html
│   │       │       │   │   ├── form-control.html
│   │       │       │   │   ├── gender.html
│   │       │       │   │   ├── hand.html
│   │       │       │   │   ├── medical.html
│   │       │       │   │   ├── new.html
│   │       │       │   │   ├── payment.html
│   │       │       │   │   ├── spinner.html
│   │       │       │   │   ├── text-editor.html
│   │       │       │   │   ├── transportation.html
│   │       │       │   │   ├── video-player.html
│   │       │       │   │   └── web-application.html
│   │       │       │   ├── jumbotron-carousel.html
│   │       │       │   ├── jumbotron.html
│   │       │       │   ├── modals
│   │       │       │   │   ├── download.html
│   │       │       │   │   └── fa5.html
│   │       │       │   ├── navbar.html
│   │       │       │   ├── new-features.html
│   │       │       │   ├── new-naming.html
│   │       │       │   ├── newsletter-subscribe.html
│   │       │       │   ├── new-upgrading.html
│   │       │       │   ├── products
│   │       │       │   │   ├── camera-retro-tee.html
│   │       │       │   │   ├── classics-tee.html
│   │       │       │   │   ├── cta-suggestions.html
│   │       │       │   │   ├── fa-ther-tee.html
│   │       │       │   │   ├── green-logo-tee.html
│   │       │       │   │   ├── old-skool-tee.html
│   │       │       │   │   ├── rock-paper-scissors-lizard-spock-tee.html
│   │       │       │   │   ├── space-shuttle-tee.html
│   │       │       │   │   └── white-logo-tee.html
│   │       │       │   ├── stripe-ad.html
│   │       │       │   ├── stripe-social.html
│   │       │       │   ├── tell-me-thanks.html
│   │       │       │   ├── tests
│   │       │       │   │   ├── rotated-flipped.html
│   │       │       │   │   ├── rotated-flipped-inside-anchor.html
│   │       │       │   │   ├── rotated-flipped-inside-btn.html
│   │       │       │   │   ├── stacked.html
│   │       │       │   │   ├── stacked-inside-anchor.html
│   │       │       │   │   └── stacked-with-text.html
│   │       │       │   ├── thanks-to.html
│   │       │       │   └── why.html
│   │       │       ├── index.html
│   │       │       ├── _layouts
│   │       │       │   ├── base.html
│   │       │       │   ├── icon.html
│   │       │       │   └── survey.html
│   │       │       ├── license.html
│   │       │       ├── Makefile
│   │       │       ├── _plugins
│   │       │       │   ├── flatten_icon_filters.rb
│   │       │       │   ├── icon_page_generator.rb
│   │       │       │   └── site.rb
│   │       │       ├── README.md-nobuild
│   │       │       ├── store.html
│   │       │       ├── survey.html
│   │       │       ├── test
│   │       │       │   ├── 2.3.2.html
│   │       │       │   ├── all.html
│   │       │       │   ├── glyphicons.html
│   │       │       │   ├── height
│   │       │       │   │   ├── 4.4.0.html
│   │       │       │   │   ├── 4.5.0.html
│   │       │       │   │   └── current.html
│   │       │       │   └── index.html
│   │       │       ├── thanks.html
│   │       │       └── whats-new.html
│   │       └── font-awesome.css
│   └── templates
│       ├── 0-hbnb.html
│       ├── 100-hbnb.html
│       ├── 101-hbnb.html
│       ├── 101-hbnb.html~
│       ├── 1-hbnb.html
│       ├── 2-hbnb.html
│       ├── 3-hbnb.html
│       └── 4-hbnb.html
├── web_flask
│   ├── 0-hello_route.py
│   ├── 100-hbnb.py
│   ├── 10-hbnb_filters.py
│   ├── 1-hbnb_route.py
│   ├── 2-c_route.py
│   ├── 3-python_route.py
│   ├── 4-number_route.py
│   ├── 5-number_template.py
│   ├── 6-number_odd_or_even.py
│   ├── 7-states_list.py
│   ├── 8-cities_by_states.py
│   ├── 9-states.py
│   ├── __init__.py
│   ├── README.md
│   ├── static
│   │   ├── images
│   │   │   ├── icon.png
│   │   │   └── logo.png
│   │   └── styles
│   │       ├── 3-footer.css
│   │       ├── 3-header.css
│   │       ├── 4-common.css
│   │       ├── 6-filters.css
│   │       ├── 8-places.css
│   │       ├── Font-Awesome
│   │       │   ├── css
│   │       │   │   └── font-awesome.css
│   │       │   ├── fonts
│   │       │   │   ├── FontAwesome.otf
│   │       │   │   ├── fontawesome-webfont.eot
│   │       │   │   ├── fontawesome-webfont.svg
│   │       │   │   ├── fontawesome-webfont.ttf
│   │       │   │   ├── fontawesome-webfont.woff
│   │       │   │   └── fontawesome-webfont.woff2
│   │       │   ├── less
│   │       │   │   ├── animated.less
│   │       │   │   ├── bordered-pulled.less
│   │       │   │   ├── core.less
│   │       │   │   ├── fixed-width.less
│   │       │   │   ├── font-awesome.less
│   │       │   │   ├── icons.less
│   │       │   │   ├── larger.less
│   │       │   │   ├── list.less
│   │       │   │   ├── mixins.less
│   │       │   │   ├── path.less
│   │       │   │   ├── rotated-flipped.less
│   │       │   │   ├── screen-reader.less
│   │       │   │   ├── stacked.less
│   │       │   │   └── variables.less
│   │       │   ├── scss
│   │       │   │   ├── _animated.scss
│   │       │   │   ├── _bordered-pulled.scss
│   │       │   │   ├── _core.scss
│   │       │   │   ├── _fixed-width.scss
│   │       │   │   ├── font-awesome.scss
│   │       │   │   ├── _icons.scss
│   │       │   │   ├── _larger.scss
│   │       │   │   ├── _list.scss
│   │       │   │   ├── _mixins.scss
│   │       │   │   ├── _path.scss
│   │       │   │   ├── _rotated-flipped.scss
│   │       │   │   ├── _screen-reader.scss
│   │       │   │   ├── _stacked.scss
│   │       │   │   └── _variables.scss
│   │       │   └── src
│   │       │       ├── 3.2.1
│   │       │       │   ├── assets
│   │       │       │   │   ├── css
│   │       │       │   │   │   ├── prettify.css
│   │       │       │   │   │   ├── pygments.css
│   │       │       │   │   │   └── site.css
│   │       │       │   │   ├── font-awesome
│   │       │       │   │   │   ├── css
│   │       │       │   │   │   │   ├── font-awesome.css
│   │       │       │   │   │   │   ├── font-awesome-ie7.css
│   │       │       │   │   │   │   ├── font-awesome-ie7.min.css
│   │       │       │   │   │   │   └── font-awesome.min.css
│   │       │       │   │   │   ├── font
│   │       │       │   │   │   │   ├── FontAwesome.otf
│   │       │       │   │   │   │   ├── fontawesome-webfont.eot
│   │       │       │   │   │   │   ├── fontawesome-webfont.svg
│   │       │       │   │   │   │   ├── fontawesome-webfont.ttf
│   │       │       │   │   │   │   └── fontawesome-webfont.woff
│   │       │       │   │   │   ├── less
│   │       │       │   │   │   │   ├── bootstrap.less
│   │       │       │   │   │   │   ├── core.less
│   │       │       │   │   │   │   ├── extras.less
│   │       │       │   │   │   │   ├── font-awesome-ie7.less
│   │       │       │   │   │   │   ├── font-awesome.less
│   │       │       │   │   │   │   ├── icons.less
│   │       │       │   │   │   │   ├── mixins.less
│   │       │       │   │   │   │   ├── path.less
│   │       │       │   │   │   │   └── variables.less
│   │       │       │   │   │   └── scss
│   │       │       │   │   │       ├── _bootstrap.scss
│   │       │       │   │   │       ├── _core.scss
│   │       │       │   │   │       ├── _extras.scss
│   │       │       │   │   │       ├── font-awesome-ie7.scss
│   │       │       │   │   │       ├── font-awesome.scss
│   │       │       │   │   │       ├── _icons.scss
│   │       │       │   │   │       ├── _mixins.scss
│   │       │       │   │   │       ├── _path.scss
│   │       │       │   │   │       └── _variables.scss
│   │       │       │   │   ├── font-awesome.zip
│   │       │       │   │   ├── ico
│   │       │       │   │   │   └── favicon.ico
│   │       │       │   │   ├── img
│   │       │       │   │   │   ├── contribution-sample.png
│   │       │       │   │   │   ├── fort_awesome.jpg
│   │       │       │   │   │   ├── glyphicons-halflings.png
│   │       │       │   │   │   ├── glyphicons-halflings-white.png
│   │       │       │   │   │   └── icon-flag.pdf
│   │       │       │   │   ├── js
│   │       │       │   │   │   ├── backbone.min.js
│   │       │       │   │   │   ├── bootstrap-222.min.js
│   │       │       │   │   │   ├── bootstrap-2.3.1.min.js
│   │       │       │   │   │   ├── jquery-1.7.1.min.js
│   │       │       │   │   │   ├── prettify.min.js
│   │       │       │   │   │   ├── site.js
│   │       │       │   │   │   ├── underscore.min.js
│   │       │       │   │   │   ├── ZeroClipboard-1.1.7.min.js
│   │       │       │   │   │   └── ZeroClipboard-1.1.7.swf
│   │       │       │   │   └── less
│   │       │       │   │       ├── bootstrap-2.3.2
│   │       │       │   │       │   ├── accordion.less
│   │       │       │   │       │   ├── alerts.less
│   │       │       │   │       │   ├── bootstrap.less
│   │       │       │   │       │   ├── breadcrumbs.less
│   │       │       │   │       │   ├── button-groups.less
│   │       │       │   │       │   ├── buttons.less
│   │       │       │   │       │   ├── carousel.less
│   │       │       │   │       │   ├── close.less
│   │       │       │   │       │   ├── code.less
│   │       │       │   │       │   ├── component-animations.less
│   │       │       │   │       │   ├── dropdowns.less
│   │       │       │   │       │   ├── forms.less
│   │       │       │   │       │   ├── grid.less
│   │       │       │   │       │   ├── hero-unit.less
│   │       │       │   │       │   ├── labels-badges.less
│   │       │       │   │       │   ├── layouts.less
│   │       │       │   │       │   ├── media.less
│   │       │       │   │       │   ├── mixins.less
│   │       │       │   │       │   ├── modals.less
│   │       │       │   │       │   ├── navbar.less
│   │       │       │   │       │   ├── navs.less
│   │       │       │   │       │   ├── pager.less
│   │       │       │   │       │   ├── pagination.less
│   │       │       │   │       │   ├── popovers.less
│   │       │       │   │       │   ├── progress-bars.less
│   │       │       │   │       │   ├── reset.less
│   │       │       │   │       │   ├── responsive-1200px-min.less
│   │       │       │   │       │   ├── responsive-767px-max.less
│   │       │       │   │       │   ├── responsive-768px-979px.less
│   │       │       │   │       │   ├── responsive.less
│   │       │       │   │       │   ├── responsive-navbar.less
│   │       │       │   │       │   ├── responsive-utilities.less
│   │       │       │   │       │   ├── scaffolding.less
│   │       │       │   │       │   ├── sprites.less
│   │       │       │   │       │   ├── tables.less
│   │       │       │   │       │   ├── thumbnails.less
│   │       │       │   │       │   ├── tooltip.less
│   │       │       │   │       │   ├── type.less
│   │       │       │   │       │   ├── utilities.less
│   │       │       │   │       │   ├── variables.less
│   │       │       │   │       │   └── wells.less
│   │       │       │   │       ├── lazy.less
│   │       │       │   │       ├── mixins.less
│   │       │       │   │       ├── responsive-1200px-min.less
│   │       │       │   │       ├── responsive-767px-max.less
│   │       │       │   │       ├── responsive-768px-979px.less
│   │       │       │   │       ├── responsive.less
│   │       │       │   │       ├── responsive-navbar.less
│   │       │       │   │       ├── site.less
│   │       │       │   │       ├── sticky-footer.less
│   │       │       │   │       └── variables.less
│   │       │       │   ├── cheatsheet
│   │       │       │   │   └── index.html
│   │       │       │   ├── CNAME
│   │       │       │   ├── community
│   │       │       │   │   └── index.html
│   │       │       │   ├── design.html
│   │       │       │   ├── examples
│   │       │       │   │   └── index.html
│   │       │       │   ├── get-started
│   │       │       │   │   └── index.html
│   │       │       │   ├── icon
│   │       │       │   │   ├── adjust
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── adn
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-center
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-justify
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── align-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ambulance
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── anchor
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── android
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── angle-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── apple
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── archive
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── arrow-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── asterisk
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── backward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ban-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bar-chart
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── barcode
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── beaker
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── beer
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bell
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bell-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bitbucket
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bitbucket-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bold
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bolt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── book
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bookmark
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bookmark-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── briefcase
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── btc
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bug
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── building
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bullhorn
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── bullseye
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── calendar
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── calendar-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── camera
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── camera-retro
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── caret-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── certificate
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check-minus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── check-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-sign-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── chevron-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-arrow-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── circle-blank
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cloud
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cloud-download
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cloud-upload
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cny
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── code
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── code-fork
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── coffee
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cog
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cogs
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── collapse
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── collapse-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── collapse-top
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── columns
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comment
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comment-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comments
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── comments-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── compass
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── copy
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── credit-card
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── crop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── css3
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── cut
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── dashboard
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── desktop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── double-angle-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── download
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── download-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── dribbble
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── dropbox
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── edit
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── edit-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eject
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ellipsis-horizontal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ellipsis-vertical
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── envelope
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── envelope-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eraser
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eur
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── exchange
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── exclamation
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── exclamation-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── expand
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── expand-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── external-link
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── external-link-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eye-close
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── eye-open
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── facebook
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── facebook-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── facetime-video
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fast-backward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fast-forward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── female
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fighter-jet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file-text
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── file-text-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── film
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── filter
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fire
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fire-extinguisher
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flag
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flag-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flag-checkered
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── flickr
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-close
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-close-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-open
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── folder-open-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── font
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── food
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── forward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── foursquare
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── frown
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── fullscreen
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gamepad
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gbp
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gift
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── github
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── github-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── github-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── gittip
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── glass
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── globe
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── google-plus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── google-plus-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── group
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hand-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hdd
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── headphones
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── heart
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── heart-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── home
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── hospital
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── h-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── html5
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── inbox
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── indent-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── indent-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── info
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── info-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── inr
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── instagram
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── italic
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── jpy
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── key
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── keyboard
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── krw
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── laptop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── leaf
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── legal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── lemon
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── level-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── level-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── lightbulb
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── link
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── linkedin
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── linkedin-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── linux
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list-ol
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── list-ul
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── location-arrow
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── lock
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── long-arrow-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── magic
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── magnet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── mail-reply-all
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── male
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── map-marker
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── maxcdn
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── medkit
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── meh
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── microphone
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── microphone-off
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── minus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── minus-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── minus-sign-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── mobile-phone
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── money
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── moon
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── move
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── music
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── off
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ok
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ok-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ok-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── paper-clip
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── paste
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pause
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pencil
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── phone
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── phone-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── picture
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pinterest
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pinterest-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plane
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── play
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── play-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── play-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plus
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plus-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── plus-sign-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── print
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── pushpin
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── puzzle-piece
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── qrcode
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── question
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── question-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── quote-left
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── quote-right
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── random
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── refresh
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── remove
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── remove-circle
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── remove-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── renren
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── reorder
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── repeat
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── reply
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── reply-all
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-full
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-horizontal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-small
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── resize-vertical
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── retweet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── road
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── rocket
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── rss
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── rss-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── save
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── screenshot
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── search
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── share
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── share-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── share-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── shield
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── shopping-cart
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── signal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sign-blank
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── signin
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── signout
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sitemap
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── skype
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── smile
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-alphabet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-alphabet-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-attributes
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-attributes-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-order
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-by-order-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sort-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── spinner
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── stackexchange
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star-half
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── star-half-empty
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── step-backward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── step-forward
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── stethoscope
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── stop
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── strikethrough
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── subscript
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── suitcase
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── sun
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── superscript
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── table
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tablet
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tag
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tags
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tasks
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── terminal
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── text-height
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── text-width
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── th
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── th-large
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── th-list
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-down-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── thumbs-up-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── ticket
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── time
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tint
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── trash
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── trello
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── trophy
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── truck
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tumblr
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── tumblr-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── twitter
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── twitter-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── umbrella
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── underline
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── undo
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── unlink
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── unlock
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── unlock-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── upload
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── upload-alt
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── usd
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── user
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── user-md
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── vk
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── volume-down
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── volume-off
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── volume-up
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── warning-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── weibo
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── windows
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── wrench
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── xing
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── xing-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── youtube
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── youtube-play
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── youtube-sign
│   │       │       │   │   │   └── index.html
│   │       │       │   │   ├── zoom-in
│   │       │       │   │   │   └── index.html
│   │       │       │   │   └── zoom-out
│   │       │       │   │       └── index.html
│   │       │       │   ├── icons
│   │       │       │   │   └── index.html
│   │       │       │   ├── icons.yml
│   │       │       │   ├── index.html
│   │       │       │   ├── license
│   │       │       │   │   └── index.html
│   │       │       │   ├── Makefile
│   │       │       │   ├── test
│   │       │       │   │   └── index.html
│   │       │       │   └── whats-new
│   │       │       │       └── index.html
│   │       │       ├── accessibility.html
│   │       │       ├── assets
│   │       │       │   ├── css
│   │       │       │   │   ├── prettify.css
│   │       │       │   │   └── pygments.css
│   │       │       │   ├── font-awesome
│   │       │       │   │   ├── fonts
│   │       │       │   │   │   ├── FontAwesome.otf
│   │       │       │   │   │   ├── fontawesome-webfont.eot
│   │       │       │   │   │   ├── fontawesome-webfont.svg
│   │       │       │   │   │   ├── fontawesome-webfont.ttf
│   │       │       │   │   │   ├── fontawesome-webfont.woff
│   │       │       │   │   │   └── fontawesome-webfont.woff2
│   │       │       │   │   ├── HELP-US-OUT.txt
│   │       │       │   │   ├── less
│   │       │       │   │   │   ├── animated.less
│   │       │       │   │   │   ├── bordered-pulled.less
│   │       │       │   │   │   ├── core.less
│   │       │       │   │   │   ├── fixed-width.less
│   │       │       │   │   │   ├── font-awesome.less
│   │       │       │   │   │   ├── icons.less
│   │       │       │   │   │   ├── larger.less
│   │       │       │   │   │   ├── list.less
│   │       │       │   │   │   ├── mixins.less
│   │       │       │   │   │   ├── path.less
│   │       │       │   │   │   ├── rotated-flipped.less
│   │       │       │   │   │   ├── screen-reader.less
│   │       │       │   │   │   ├── stacked.less
│   │       │       │   │   │   └── variables.less
│   │       │       │   │   └── scss
│   │       │       │   │       ├── _animated.scss
│   │       │       │   │       ├── _bordered-pulled.scss
│   │       │       │   │       ├── _core.scss
│   │       │       │   │       ├── _fixed-width.scss
│   │       │       │   │       ├── font-awesome.scss
│   │       │       │   │       ├── _icons.scss
│   │       │       │   │       ├── _larger.scss
│   │       │       │   │       ├── _list.scss
│   │       │       │   │       ├── _mixins.scss
│   │       │       │   │       ├── _path.scss
│   │       │       │   │       ├── _rotated-flipped.scss
│   │       │       │   │       ├── _screen-reader.scss
│   │       │       │   │       ├── _stacked.scss
│   │       │       │   │       └── _variables.scss
│   │       │       │   ├── ico
│   │       │       │   │   └── favicon.ico
│   │       │       │   ├── img
│   │       │       │   │   ├── algolia.png
│   │       │       │   │   ├── logo-themeisle.png
│   │       │       │   │   └── logo-wpbeginner.png
│   │       │       │   ├── js
│   │       │       │   │   ├── html5shiv.js
│   │       │       │   │   ├── monetization.js
│   │       │       │   │   ├── prettify.min.js
│   │       │       │   │   ├── respond.min.js
│   │       │       │   │   ├── search.js
│   │       │       │   │   ├── site.js
│   │       │       │   │   ├── ZeroClipboard-1.1.7.min.js
│   │       │       │   │   └── ZeroClipboard-1.1.7.swf
│   │       │       │   └── less
│   │       │       │       ├── bootstrap-3.3.5
│   │       │       │       │   ├── alerts.less
│   │       │       │       │   ├── badges.less
│   │       │       │       │   ├── bootstrap.less
│   │       │       │       │   ├── breadcrumbs.less
│   │       │       │       │   ├── button-groups.less
│   │       │       │       │   ├── buttons.less
│   │       │       │       │   ├── carousel.less
│   │       │       │       │   ├── close.less
│   │       │       │       │   ├── code.less
│   │       │       │       │   ├── component-animations.less
│   │       │       │       │   ├── dropdowns.less
│   │       │       │       │   ├── forms.less
│   │       │       │       │   ├── glyphicons.less
│   │       │       │       │   ├── grid.less
│   │       │       │       │   ├── input-groups.less
│   │       │       │       │   ├── jumbotron.less
│   │       │       │       │   ├── labels.less
│   │       │       │       │   ├── list-group.less
│   │       │       │       │   ├── media.less
│   │       │       │       │   ├── mixins
│   │       │       │       │   │   ├── alerts.less
│   │       │       │       │   │   ├── background-variant.less
│   │       │       │       │   │   ├── border-radius.less
│   │       │       │       │   │   ├── buttons.less
│   │       │       │       │   │   ├── center-block.less
│   │       │       │       │   │   ├── clearfix.less
│   │       │       │       │   │   ├── forms.less
│   │       │       │       │   │   ├── gradients.less
│   │       │       │       │   │   ├── grid-framework.less
│   │       │       │       │   │   ├── grid.less
│   │       │       │       │   │   ├── hide-text.less
│   │       │       │       │   │   ├── image.less
│   │       │       │       │   │   ├── labels.less
│   │       │       │       │   │   ├── list-group.less
│   │       │       │       │   │   ├── nav-divider.less
│   │       │       │       │   │   ├── nav-vertical-align.less
│   │       │       │       │   │   ├── opacity.less
│   │       │       │       │   │   ├── pagination.less
│   │       │       │       │   │   ├── panels.less
│   │       │       │       │   │   ├── progress-bar.less
│   │       │       │       │   │   ├── reset-filter.less
│   │       │       │       │   │   ├── reset-text.less
│   │       │       │       │   │   ├── resize.less
│   │       │       │       │   │   ├── responsive-visibility.less
│   │       │       │       │   │   ├── size.less
│   │       │       │       │   │   ├── tab-focus.less
│   │       │       │       │   │   ├── table-row.less
│   │       │       │       │   │   ├── text-emphasis.less
│   │       │       │       │   │   ├── text-overflow.less
│   │       │       │       │   │   └── vendor-prefixes.less
│   │       │       │       │   ├── mixins.less
│   │       │       │       │   ├── modals.less
│   │       │       │       │   ├── navbar.less
│   │       │       │       │   ├── navs.less
│   │       │       │       │   ├── normalize.less
│   │       │       │       │   ├── pager.less
│   │       │       │       │   ├── pagination.less
│   │       │       │       │   ├── panels.less
│   │       │       │       │   ├── popovers.less
│   │       │       │       │   ├── print.less
│   │       │       │       │   ├── progress-bars.less
│   │       │       │       │   ├── responsive-embed.less
│   │       │       │       │   ├── responsive-utilities.less
│   │       │       │       │   ├── scaffolding.less
│   │       │       │       │   ├── tables.less
│   │       │       │       │   ├── theme.less
│   │       │       │       │   ├── thumbnails.less
│   │       │       │       │   ├── tooltip.less
│   │       │       │       │   ├── type.less
│   │       │       │       │   ├── utilities.less
│   │       │       │       │   ├── variables.less
│   │       │       │       │   └── wells.less
│   │       │       │       ├── gandy-grid
│   │       │       │       │   ├── grid.less
│   │       │       │       │   └── mixins.less
│   │       │       │       ├── site
│   │       │       │       │   ├── algolia.less
│   │       │       │       │   ├── banner-ad.less
│   │       │       │       │   ├── bootstrap
│   │       │       │       │   │   ├── alerts.less
│   │       │       │       │   │   ├── buttons.less
│   │       │       │       │   │   ├── jumbotron.less
│   │       │       │       │   │   ├── labels.less
│   │       │       │       │   │   ├── modals.less
│   │       │       │       │   │   ├── navbar.less
│   │       │       │       │   │   ├── panels.less
│   │       │       │       │   │   ├── tooltip.less
│   │       │       │       │   │   ├── type.less
│   │       │       │       │   │   ├── variables.less
│   │       │       │       │   │   └── wells.less
│   │       │       │       │   ├── bsap-ad.less
│   │       │       │       │   ├── carbon-ad.less
│   │       │       │       │   ├── example-rating.less
│   │       │       │       │   ├── fa5.less
│   │       │       │       │   ├── feature-list.less
│   │       │       │       │   ├── fontawesome-icon-list.less
│   │       │       │       │   ├── footer.less
│   │       │       │       │   ├── jumbotron-carousel.less
│   │       │       │       │   ├── layout.less
│   │       │       │       │   ├── lazy.less
│   │       │       │       │   ├── newsletter.less
│   │       │       │       │   ├── print.less
│   │       │       │       │   ├── responsive
│   │       │       │       │   │   ├── screen-lg.less
│   │       │       │       │   │   ├── screen-md.less
│   │       │       │       │   │   ├── screen-sm.less
│   │       │       │       │   │   ├── screen-sm-up.less
│   │       │       │       │   │   └── screen-xs.less
│   │       │       │       │   ├── search.less
│   │       │       │       │   ├── social-buttons.less
│   │       │       │       │   ├── store.less
│   │       │       │       │   ├── stripe-ad.less
│   │       │       │       │   ├── sumome.less
│   │       │       │       │   ├── textured-bg.less
│   │       │       │       │   └── views.less
│   │       │       │       └── site.less
│   │       │       ├── cdn
│   │       │       │   ├── error.html
│   │       │       │   └── success.html
│   │       │       ├── cheatsheet.html
│   │       │       ├── CNAME
│   │       │       ├── community.html
│   │       │       ├── design.html
│   │       │       ├── examples.html
│   │       │       ├── get-started.html
│   │       │       ├── icons.html
│   │       │       ├── icons.yml
│   │       │       ├── _includes
│   │       │       │   ├── accessibility
│   │       │       │   │   ├── accessibility-facdn.html
│   │       │       │   │   ├── accessibility-manual.html
│   │       │       │   │   ├── background.html
│   │       │       │   │   ├── cta-cdn-ally.html
│   │       │       │   │   └── other.html
│   │       │       │   ├── ads
│   │       │       │   │   └── carbon.html
│   │       │       │   ├── brand-adblock-warning.html
│   │       │       │   ├── brand-license.html
│   │       │       │   ├── code
│   │       │       │   │   ├── core.less
│   │       │       │   │   ├── core.scss
│   │       │       │   │   └── license.css
│   │       │       │   ├── community
│   │       │       │   │   ├── getting-support.html
│   │       │       │   │   ├── project-milestones.html
│   │       │       │   │   ├── reporting-bugs.html
│   │       │       │   │   ├── requesting-new-icons.html
│   │       │       │   │   └── submitting-pull-requests.html
│   │       │       │   ├── examples
│   │       │       │   │   ├── accessible.html
│   │       │       │   │   ├── animated.html
│   │       │       │   │   ├── basic.html
│   │       │       │   │   ├── bootstrap.html
│   │       │       │   │   ├── bordered-pulled.html
│   │       │       │   │   ├── custom.html
│   │       │       │   │   ├── fixed-width.html
│   │       │       │   │   ├── larger.html
│   │       │       │   │   ├── list.html
│   │       │       │   │   ├── rotated-flipped.html
│   │       │       │   │   └── stacked.html
│   │       │       │   ├── footer.html
│   │       │       │   ├── icons
│   │       │       │   │   ├── accessibility.html
│   │       │       │   │   ├── brand.html
│   │       │       │   │   ├── chart.html
│   │       │       │   │   ├── currency.html
│   │       │       │   │   ├── directional.html
│   │       │       │   │   ├── file-type.html
│   │       │       │   │   ├── form-control.html
│   │       │       │   │   ├── gender.html
│   │       │       │   │   ├── hand.html
│   │       │       │   │   ├── medical.html
│   │       │       │   │   ├── new.html
│   │       │       │   │   ├── payment.html
│   │       │       │   │   ├── spinner.html
│   │       │       │   │   ├── text-editor.html
│   │       │       │   │   ├── transportation.html
│   │       │       │   │   ├── video-player.html
│   │       │       │   │   └── web-application.html
│   │       │       │   ├── jumbotron-carousel.html
│   │       │       │   ├── jumbotron.html
│   │       │       │   ├── modals
│   │       │       │   │   ├── download.html
│   │       │       │   │   └── fa5.html
│   │       │       │   ├── navbar.html
│   │       │       │   ├── new-features.html
│   │       │       │   ├── new-naming.html
│   │       │       │   ├── newsletter-subscribe.html
│   │       │       │   ├── new-upgrading.html
│   │       │       │   ├── products
│   │       │       │   │   ├── camera-retro-tee.html
│   │       │       │   │   ├── classics-tee.html
│   │       │       │   │   ├── cta-suggestions.html
│   │       │       │   │   ├── fa-ther-tee.html
│   │       │       │   │   ├── green-logo-tee.html
│   │       │       │   │   ├── old-skool-tee.html
│   │       │       │   │   ├── rock-paper-scissors-lizard-spock-tee.html
│   │       │       │   │   ├── space-shuttle-tee.html
│   │       │       │   │   └── white-logo-tee.html
│   │       │       │   ├── stripe-ad.html
│   │       │       │   ├── stripe-social.html
│   │       │       │   ├── tell-me-thanks.html
│   │       │       │   ├── tests
│   │       │       │   │   ├── rotated-flipped.html
│   │       │       │   │   ├── rotated-flipped-inside-anchor.html
│   │       │       │   │   ├── rotated-flipped-inside-btn.html
│   │       │       │   │   ├── stacked.html
│   │       │       │   │   ├── stacked-inside-anchor.html
│   │       │       │   │   └── stacked-with-text.html
│   │       │       │   ├── thanks-to.html
│   │       │       │   └── why.html
│   │       │       ├── index.html
│   │       │       ├── _layouts
│   │       │       │   ├── base.html
│   │       │       │   ├── icon.html
│   │       │       │   └── survey.html
│   │       │       ├── license.html
│   │       │       ├── Makefile
│   │       │       ├── _plugins
│   │       │       │   ├── flatten_icon_filters.rb
│   │       │       │   ├── icon_page_generator.rb
│   │       │       │   └── site.rb
│   │       │       ├── README.md-nobuild
│   │       │       ├── store.html
│   │       │       ├── survey.html
│   │       │       ├── test
│   │       │       │   ├── 2.3.2.html
│   │       │       │   ├── all.html
│   │       │       │   ├── glyphicons.html
│   │       │       │   ├── height
│   │       │       │   │   ├── 4.4.0.html
│   │       │       │   │   ├── 4.5.0.html
│   │       │       │   │   └── current.html
│   │       │       │   └── index.html
│   │       │       ├── thanks.html
│   │       │       └── whats-new.html
│   │       └── font-awesome.css
│   └── templates
│       ├── 100-hbnb.html
│       ├── 10-hbnb_filters.html
│       ├── 5-number.html
│       ├── 6-number_odd_or_even.html
│       ├── 7-states_list.html
│       ├── 8-cities_by_states.html
│       └── 9-states.html
├── web_static
│   ├── 0-index.html
│   ├── 100-index.html
│   ├── 101-index.html
│   ├── 102-index.html
│   ├── 103-index.html
│   ├── 1-index.html
│   ├── 2-index.html
│   ├── 3-index.html
│   ├── 4-index.html
│   ├── 5-index.html
│   ├── 6-index.html
│   ├── 7-index.html
│   ├── 8-index.html
│   ├── images
│   │   ├── hbtn-Favicon-64x64-4x.png
│   │   ├── icon_bath.png
│   │   ├── icon_bed.png
│   │   ├── icon_group.png
│   │   ├── icon.png
│   │   └── logo.png
│   ├── styles
│   │   ├── 100-places.css
│   │   ├── 101-places.css
│   │   ├── 102-common.css
│   │   ├── 102-filters.css
│   │   ├── 102-footer.css
│   │   ├── 102-header.css
│   │   ├── 102-places.css
│   │   ├── 103-common.css
│   │   ├── 103-filters.css
│   │   ├── 103-footer.css
│   │   ├── 103-header.css
│   │   ├── 103-places.css
│   │   ├── 2-common.css
│   │   ├── 2-footer.css
│   │   ├── 2-header.css
│   │   ├── 3-common.css
│   │   ├── 3-footer.css
│   │   ├── 3-header.css
│   │   ├── 4-common.css
│   │   ├── 4-filters.css
│   │   ├── 5-filters.css
│   │   ├── 6-filters.css
│   │   ├── 7-places.css
│   │   ├── 8-places.css
│   │   ├── Font-Awesome
│   │   │   ├── css
│   │   │   │   └── font-awesome.css
│   │   │   ├── fonts
│   │   │   │   ├── FontAwesome.otf
│   │   │   │   ├── fontawesome-webfont.eot
│   │   │   │   ├── fontawesome-webfont.svg
│   │   │   │   ├── fontawesome-webfont.ttf
│   │   │   │   ├── fontawesome-webfont.woff
│   │   │   │   └── fontawesome-webfont.woff2
│   │   │   ├── less
│   │   │   │   ├── animated.less
│   │   │   │   ├── bordered-pulled.less
│   │   │   │   ├── core.less
│   │   │   │   ├── fixed-width.less
│   │   │   │   ├── font-awesome.less
│   │   │   │   ├── icons.less
│   │   │   │   ├── larger.less
│   │   │   │   ├── list.less
│   │   │   │   ├── mixins.less
│   │   │   │   ├── path.less
│   │   │   │   ├── rotated-flipped.less
│   │   │   │   ├── screen-reader.less
│   │   │   │   ├── stacked.less
│   │   │   │   └── variables.less
│   │   │   ├── scss
│   │   │   │   ├── _animated.scss
│   │   │   │   ├── _bordered-pulled.scss
│   │   │   │   ├── _core.scss
│   │   │   │   ├── _fixed-width.scss
│   │   │   │   ├── font-awesome.scss
│   │   │   │   ├── _icons.scss
│   │   │   │   ├── _larger.scss
│   │   │   │   ├── _list.scss
│   │   │   │   ├── _mixins.scss
│   │   │   │   ├── _path.scss
│   │   │   │   ├── _rotated-flipped.scss
│   │   │   │   ├── _screen-reader.scss
│   │   │   │   ├── _stacked.scss
│   │   │   │   └── _variables.scss
│   │   │   └── src
│   │   │       ├── 3.2.1
│   │   │       │   ├── assets
│   │   │       │   │   ├── css
│   │   │       │   │   │   ├── prettify.css
│   │   │       │   │   │   ├── pygments.css
│   │   │       │   │   │   └── site.css
│   │   │       │   │   ├── font-awesome
│   │   │       │   │   │   ├── css
│   │   │       │   │   │   │   ├── font-awesome.css
│   │   │       │   │   │   │   ├── font-awesome-ie7.css
│   │   │       │   │   │   │   ├── font-awesome-ie7.min.css
│   │   │       │   │   │   │   └── font-awesome.min.css
│   │   │       │   │   │   ├── font
│   │   │       │   │   │   │   ├── FontAwesome.otf
│   │   │       │   │   │   │   ├── fontawesome-webfont.eot
│   │   │       │   │   │   │   ├── fontawesome-webfont.svg
│   │   │       │   │   │   │   ├── fontawesome-webfont.ttf
│   │   │       │   │   │   │   └── fontawesome-webfont.woff
│   │   │       │   │   │   ├── less
│   │   │       │   │   │   │   ├── bootstrap.less
│   │   │       │   │   │   │   ├── core.less
│   │   │       │   │   │   │   ├── extras.less
│   │   │       │   │   │   │   ├── font-awesome-ie7.less
│   │   │       │   │   │   │   ├── font-awesome.less
│   │   │       │   │   │   │   ├── icons.less
│   │   │       │   │   │   │   ├── mixins.less
│   │   │       │   │   │   │   ├── path.less
│   │   │       │   │   │   │   └── variables.less
│   │   │       │   │   │   └── scss
│   │   │       │   │   │       ├── _bootstrap.scss
│   │   │       │   │   │       ├── _core.scss
│   │   │       │   │   │       ├── _extras.scss
│   │   │       │   │   │       ├── font-awesome-ie7.scss
│   │   │       │   │   │       ├── font-awesome.scss
│   │   │       │   │   │       ├── _icons.scss
│   │   │       │   │   │       ├── _mixins.scss
│   │   │       │   │   │       ├── _path.scss
│   │   │       │   │   │       └── _variables.scss
│   │   │       │   │   ├── font-awesome.zip
│   │   │       │   │   ├── ico
│   │   │       │   │   │   └── favicon.ico
│   │   │       │   │   ├── img
│   │   │       │   │   │   ├── contribution-sample.png
│   │   │       │   │   │   ├── fort_awesome.jpg
│   │   │       │   │   │   ├── glyphicons-halflings.png
│   │   │       │   │   │   ├── glyphicons-halflings-white.png
│   │   │       │   │   │   └── icon-flag.pdf
│   │   │       │   │   ├── js
│   │   │       │   │   │   ├── backbone.min.js
│   │   │       │   │   │   ├── bootstrap-222.min.js
│   │   │       │   │   │   ├── bootstrap-2.3.1.min.js
│   │   │       │   │   │   ├── jquery-1.7.1.min.js
│   │   │       │   │   │   ├── prettify.min.js
│   │   │       │   │   │   ├── site.js
│   │   │       │   │   │   ├── underscore.min.js
│   │   │       │   │   │   ├── ZeroClipboard-1.1.7.min.js
│   │   │       │   │   │   └── ZeroClipboard-1.1.7.swf
│   │   │       │   │   └── less
│   │   │       │   │       ├── bootstrap-2.3.2
│   │   │       │   │       │   ├── accordion.less
│   │   │       │   │       │   ├── alerts.less
│   │   │       │   │       │   ├── bootstrap.less
│   │   │       │   │       │   ├── breadcrumbs.less
│   │   │       │   │       │   ├── button-groups.less
│   │   │       │   │       │   ├── buttons.less
│   │   │       │   │       │   ├── carousel.less
│   │   │       │   │       │   ├── close.less
│   │   │       │   │       │   ├── code.less
│   │   │       │   │       │   ├── component-animations.less
│   │   │       │   │       │   ├── dropdowns.less
│   │   │       │   │       │   ├── forms.less
│   │   │       │   │       │   ├── grid.less
│   │   │       │   │       │   ├── hero-unit.less
│   │   │       │   │       │   ├── labels-badges.less
│   │   │       │   │       │   ├── layouts.less
│   │   │       │   │       │   ├── media.less
│   │   │       │   │       │   ├── mixins.less
│   │   │       │   │       │   ├── modals.less
│   │   │       │   │       │   ├── navbar.less
│   │   │       │   │       │   ├── navs.less
│   │   │       │   │       │   ├── pager.less
│   │   │       │   │       │   ├── pagination.less
│   │   │       │   │       │   ├── popovers.less
│   │   │       │   │       │   ├── progress-bars.less
│   │   │       │   │       │   ├── reset.less
│   │   │       │   │       │   ├── responsive-1200px-min.less
│   │   │       │   │       │   ├── responsive-767px-max.less
│   │   │       │   │       │   ├── responsive-768px-979px.less
│   │   │       │   │       │   ├── responsive.less
│   │   │       │   │       │   ├── responsive-navbar.less
│   │   │       │   │       │   ├── responsive-utilities.less
│   │   │       │   │       │   ├── scaffolding.less
│   │   │       │   │       │   ├── sprites.less
│   │   │       │   │       │   ├── tables.less
│   │   │       │   │       │   ├── thumbnails.less
│   │   │       │   │       │   ├── tooltip.less
│   │   │       │   │       │   ├── type.less
│   │   │       │   │       │   ├── utilities.less
│   │   │       │   │       │   ├── variables.less
│   │   │       │   │       │   └── wells.less
│   │   │       │   │       ├── lazy.less
│   │   │       │   │       ├── mixins.less
│   │   │       │   │       ├── responsive-1200px-min.less
│   │   │       │   │       ├── responsive-767px-max.less
│   │   │       │   │       ├── responsive-768px-979px.less
│   │   │       │   │       ├── responsive.less
│   │   │       │   │       ├── responsive-navbar.less
│   │   │       │   │       ├── site.less
│   │   │       │   │       ├── sticky-footer.less
│   │   │       │   │       └── variables.less
│   │   │       │   ├── cheatsheet
│   │   │       │   │   └── index.html
│   │   │       │   ├── CNAME
│   │   │       │   ├── community
│   │   │       │   │   └── index.html
│   │   │       │   ├── design.html
│   │   │       │   ├── examples
│   │   │       │   │   └── index.html
│   │   │       │   ├── get-started
│   │   │       │   │   └── index.html
│   │   │       │   ├── icon
│   │   │       │   │   ├── adjust
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── adn
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── align-center
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── align-justify
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── align-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── align-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ambulance
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── anchor
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── android
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── angle-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── angle-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── angle-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── angle-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── apple
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── archive
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── arrow-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── arrow-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── arrow-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── arrow-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── asterisk
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── backward
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ban-circle
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bar-chart
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── barcode
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── beaker
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── beer
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bell
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bell-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bitbucket
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bitbucket-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bold
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bolt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── book
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bookmark
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bookmark-empty
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── briefcase
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── btc
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bug
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── building
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bullhorn
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── bullseye
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── calendar
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── calendar-empty
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── camera
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── camera-retro
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── caret-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── caret-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── caret-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── caret-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── certificate
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── check
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── check-empty
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── check-minus
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── check-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-sign-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-sign-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-sign-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-sign-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── chevron-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── circle
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── circle-arrow-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── circle-arrow-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── circle-arrow-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── circle-arrow-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── circle-blank
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── cloud
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── cloud-download
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── cloud-upload
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── cny
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── code
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── code-fork
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── coffee
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── cog
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── cogs
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── collapse
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── collapse-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── collapse-top
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── columns
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── comment
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── comment-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── comments
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── comments-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── compass
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── copy
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── credit-card
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── crop
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── css3
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── cut
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── dashboard
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── desktop
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── double-angle-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── double-angle-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── double-angle-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── double-angle-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── download
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── download-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── dribbble
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── dropbox
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── edit
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── edit-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── eject
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ellipsis-horizontal
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ellipsis-vertical
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── envelope
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── envelope-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── eraser
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── eur
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── exchange
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── exclamation
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── exclamation-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── expand
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── expand-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── external-link
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── external-link-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── eye-close
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── eye-open
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── facebook
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── facebook-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── facetime-video
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── fast-backward
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── fast-forward
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── female
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── fighter-jet
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── file
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── file-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── file-text
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── file-text-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── film
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── filter
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── fire
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── fire-extinguisher
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── flag
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── flag-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── flag-checkered
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── flickr
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── folder-close
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── folder-close-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── folder-open
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── folder-open-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── font
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── food
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── forward
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── foursquare
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── frown
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── fullscreen
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── gamepad
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── gbp
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── gift
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── github
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── github-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── github-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── gittip
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── glass
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── globe
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── google-plus
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── google-plus-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── group
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── hand-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── hand-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── hand-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── hand-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── hdd
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── headphones
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── heart
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── heart-empty
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── home
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── hospital
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── h-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── html5
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── inbox
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── indent-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── indent-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── info
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── info-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── inr
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── instagram
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── italic
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── jpy
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── key
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── keyboard
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── krw
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── laptop
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── leaf
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── legal
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── lemon
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── level-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── level-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── lightbulb
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── link
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── linkedin
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── linkedin-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── linux
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── list
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── list-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── list-ol
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── list-ul
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── location-arrow
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── lock
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── long-arrow-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── long-arrow-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── long-arrow-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── long-arrow-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── magic
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── magnet
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── mail-reply-all
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── male
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── map-marker
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── maxcdn
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── medkit
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── meh
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── microphone
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── microphone-off
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── minus
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── minus-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── minus-sign-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── mobile-phone
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── money
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── moon
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── move
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── music
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── off
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ok
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ok-circle
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ok-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── paper-clip
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── paste
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── pause
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── pencil
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── phone
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── phone-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── picture
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── pinterest
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── pinterest-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── plane
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── play
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── play-circle
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── play-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── plus
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── plus-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── plus-sign-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── print
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── pushpin
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── puzzle-piece
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── qrcode
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── question
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── question-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── quote-left
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── quote-right
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── random
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── refresh
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── remove
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── remove-circle
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── remove-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── renren
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── reorder
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── repeat
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── reply
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── reply-all
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── resize-full
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── resize-horizontal
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── resize-small
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── resize-vertical
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── retweet
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── road
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── rocket
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── rss
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── rss-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── save
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── screenshot
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── search
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── share
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── share-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── share-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── shield
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── shopping-cart
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── signal
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sign-blank
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── signin
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── signout
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sitemap
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── skype
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── smile
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-by-alphabet
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-by-alphabet-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-by-attributes
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-by-attributes-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-by-order
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-by-order-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sort-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── spinner
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── stackexchange
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── star
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── star-empty
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── star-half
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── star-half-empty
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── step-backward
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── step-forward
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── stethoscope
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── stop
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── strikethrough
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── subscript
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── suitcase
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── sun
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── superscript
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── table
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── tablet
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── tag
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── tags
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── tasks
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── terminal
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── text-height
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── text-width
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── th
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── th-large
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── th-list
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── thumbs-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── thumbs-down-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── thumbs-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── thumbs-up-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── ticket
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── time
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── tint
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── trash
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── trello
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── trophy
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── truck
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── tumblr
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── tumblr-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── twitter
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── twitter-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── umbrella
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── underline
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── undo
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── unlink
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── unlock
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── unlock-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── upload
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── upload-alt
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── usd
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── user
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── user-md
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── vk
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── volume-down
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── volume-off
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── volume-up
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── warning-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── weibo
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── windows
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── wrench
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── xing
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── xing-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── youtube
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── youtube-play
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── youtube-sign
│   │   │       │   │   │   └── index.html
│   │   │       │   │   ├── zoom-in
│   │   │       │   │   │   └── index.html
│   │   │       │   │   └── zoom-out
│   │   │       │   │       └── index.html
│   │   │       │   ├── icons
│   │   │       │   │   └── index.html
│   │   │       │   ├── icons.yml
│   │   │       │   ├── index.html
│   │   │       │   ├── license
│   │   │       │   │   └── index.html
│   │   │       │   ├── Makefile
│   │   │       │   ├── test
│   │   │       │   │   └── index.html
│   │   │       │   └── whats-new
│   │   │       │       └── index.html
│   │   │       ├── accessibility.html
│   │   │       ├── assets
│   │   │       │   ├── css
│   │   │       │   │   ├── prettify.css
│   │   │       │   │   └── pygments.css
│   │   │       │   ├── font-awesome
│   │   │       │   │   ├── fonts
│   │   │       │   │   │   ├── FontAwesome.otf
│   │   │       │   │   │   ├── fontawesome-webfont.eot
│   │   │       │   │   │   ├── fontawesome-webfont.svg
│   │   │       │   │   │   ├── fontawesome-webfont.ttf
│   │   │       │   │   │   ├── fontawesome-webfont.woff
│   │   │       │   │   │   └── fontawesome-webfont.woff2
│   │   │       │   │   ├── HELP-US-OUT.txt
│   │   │       │   │   ├── less
│   │   │       │   │   │   ├── animated.less
│   │   │       │   │   │   ├── bordered-pulled.less
│   │   │       │   │   │   ├── core.less
│   │   │       │   │   │   ├── fixed-width.less
│   │   │       │   │   │   ├── font-awesome.less
│   │   │       │   │   │   ├── icons.less
│   │   │       │   │   │   ├── larger.less
│   │   │       │   │   │   ├── list.less
│   │   │       │   │   │   ├── mixins.less
│   │   │       │   │   │   ├── path.less
│   │   │       │   │   │   ├── rotated-flipped.less
│   │   │       │   │   │   ├── screen-reader.less
│   │   │       │   │   │   ├── stacked.less
│   │   │       │   │   │   └── variables.less
│   │   │       │   │   └── scss
│   │   │       │   │       ├── _animated.scss
│   │   │       │   │       ├── _bordered-pulled.scss
│   │   │       │   │       ├── _core.scss
│   │   │       │   │       ├── _fixed-width.scss
│   │   │       │   │       ├── font-awesome.scss
│   │   │       │   │       ├── _icons.scss
│   │   │       │   │       ├── _larger.scss
│   │   │       │   │       ├── _list.scss
│   │   │       │   │       ├── _mixins.scss
│   │   │       │   │       ├── _path.scss
│   │   │       │   │       ├── _rotated-flipped.scss
│   │   │       │   │       ├── _screen-reader.scss
│   │   │       │   │       ├── _stacked.scss
│   │   │       │   │       └── _variables.scss
│   │   │       │   ├── ico
│   │   │       │   │   └── favicon.ico
│   │   │       │   ├── img
│   │   │       │   │   ├── algolia.png
│   │   │       │   │   ├── logo-themeisle.png
│   │   │       │   │   └── logo-wpbeginner.png
│   │   │       │   ├── js
│   │   │       │   │   ├── html5shiv.js
│   │   │       │   │   ├── monetization.js
│   │   │       │   │   ├── prettify.min.js
│   │   │       │   │   ├── respond.min.js
│   │   │       │   │   ├── search.js
│   │   │       │   │   ├── site.js
│   │   │       │   │   ├── ZeroClipboard-1.1.7.min.js
│   │   │       │   │   └── ZeroClipboard-1.1.7.swf
│   │   │       │   └── less
│   │   │       │       ├── bootstrap-3.3.5
│   │   │       │       │   ├── alerts.less
│   │   │       │       │   ├── badges.less
│   │   │       │       │   ├── bootstrap.less
│   │   │       │       │   ├── breadcrumbs.less
│   │   │       │       │   ├── button-groups.less
│   │   │       │       │   ├── buttons.less
│   │   │       │       │   ├── carousel.less
│   │   │       │       │   ├── close.less
│   │   │       │       │   ├── code.less
│   │   │       │       │   ├── component-animations.less
│   │   │       │       │   ├── dropdowns.less
│   │   │       │       │   ├── forms.less
│   │   │       │       │   ├── glyphicons.less
│   │   │       │       │   ├── grid.less
│   │   │       │       │   ├── input-groups.less
│   │   │       │       │   ├── jumbotron.less
│   │   │       │       │   ├── labels.less
│   │   │       │       │   ├── list-group.less
│   │   │       │       │   ├── media.less
│   │   │       │       │   ├── mixins
│   │   │       │       │   │   ├── alerts.less
│   │   │       │       │   │   ├── background-variant.less
│   │   │       │       │   │   ├── border-radius.less
│   │   │       │       │   │   ├── buttons.less
│   │   │       │       │   │   ├── center-block.less
│   │   │       │       │   │   ├── clearfix.less
│   │   │       │       │   │   ├── forms.less
│   │   │       │       │   │   ├── gradients.less
│   │   │       │       │   │   ├── grid-framework.less
│   │   │       │       │   │   ├── grid.less
│   │   │       │       │   │   ├── hide-text.less
│   │   │       │       │   │   ├── image.less
│   │   │       │       │   │   ├── labels.less
│   │   │       │       │   │   ├── list-group.less
│   │   │       │       │   │   ├── nav-divider.less
│   │   │       │       │   │   ├── nav-vertical-align.less
│   │   │       │       │   │   ├── opacity.less
│   │   │       │       │   │   ├── pagination.less
│   │   │       │       │   │   ├── panels.less
│   │   │       │       │   │   ├── progress-bar.less
│   │   │       │       │   │   ├── reset-filter.less
│   │   │       │       │   │   ├── reset-text.less
│   │   │       │       │   │   ├── resize.less
│   │   │       │       │   │   ├── responsive-visibility.less
│   │   │       │       │   │   ├── size.less
│   │   │       │       │   │   ├── tab-focus.less
│   │   │       │       │   │   ├── table-row.less
│   │   │       │       │   │   ├── text-emphasis.less
│   │   │       │       │   │   ├── text-overflow.less
│   │   │       │       │   │   └── vendor-prefixes.less
│   │   │       │       │   ├── mixins.less
│   │   │       │       │   ├── modals.less
│   │   │       │       │   ├── navbar.less
│   │   │       │       │   ├── navs.less
│   │   │       │       │   ├── normalize.less
│   │   │       │       │   ├── pager.less
│   │   │       │       │   ├── pagination.less
│   │   │       │       │   ├── panels.less
│   │   │       │       │   ├── popovers.less
│   │   │       │       │   ├── print.less
│   │   │       │       │   ├── progress-bars.less
│   │   │       │       │   ├── responsive-embed.less
│   │   │       │       │   ├── responsive-utilities.less
│   │   │       │       │   ├── scaffolding.less
│   │   │       │       │   ├── tables.less
│   │   │       │       │   ├── theme.less
│   │   │       │       │   ├── thumbnails.less
│   │   │       │       │   ├── tooltip.less
│   │   │       │       │   ├── type.less
│   │   │       │       │   ├── utilities.less
│   │   │       │       │   ├── variables.less
│   │   │       │       │   └── wells.less
│   │   │       │       ├── gandy-grid
│   │   │       │       │   ├── grid.less
│   │   │       │       │   └── mixins.less
│   │   │       │       ├── site
│   │   │       │       │   ├── algolia.less
│   │   │       │       │   ├── banner-ad.less
│   │   │       │       │   ├── bootstrap
│   │   │       │       │   │   ├── alerts.less
│   │   │       │       │   │   ├── buttons.less
│   │   │       │       │   │   ├── jumbotron.less
│   │   │       │       │   │   ├── labels.less
│   │   │       │       │   │   ├── modals.less
│   │   │       │       │   │   ├── navbar.less
│   │   │       │       │   │   ├── panels.less
│   │   │       │       │   │   ├── tooltip.less
│   │   │       │       │   │   ├── type.less
│   │   │       │       │   │   ├── variables.less
│   │   │       │       │   │   └── wells.less
│   │   │       │       │   ├── bsap-ad.less
│   │   │       │       │   ├── carbon-ad.less
│   │   │       │       │   ├── example-rating.less
│   │   │       │       │   ├── fa5.less
│   │   │       │       │   ├── feature-list.less
│   │   │       │       │   ├── fontawesome-icon-list.less
│   │   │       │       │   ├── footer.less
│   │   │       │       │   ├── jumbotron-carousel.less
│   │   │       │       │   ├── layout.less
│   │   │       │       │   ├── lazy.less
│   │   │       │       │   ├── newsletter.less
│   │   │       │       │   ├── print.less
│   │   │       │       │   ├── responsive
│   │   │       │       │   │   ├── screen-lg.less
│   │   │       │       │   │   ├── screen-md.less
│   │   │       │       │   │   ├── screen-sm.less
│   │   │       │       │   │   ├── screen-sm-up.less
│   │   │       │       │   │   └── screen-xs.less
│   │   │       │       │   ├── search.less
│   │   │       │       │   ├── social-buttons.less
│   │   │       │       │   ├── store.less
│   │   │       │       │   ├── stripe-ad.less
│   │   │       │       │   ├── sumome.less
│   │   │       │       │   ├── textured-bg.less
│   │   │       │       │   └── views.less
│   │   │       │       └── site.less
│   │   │       ├── cdn
│   │   │       │   ├── error.html
│   │   │       │   └── success.html
│   │   │       ├── cheatsheet.html
│   │   │       ├── CNAME
│   │   │       ├── community.html
│   │   │       ├── design.html
│   │   │       ├── examples.html
│   │   │       ├── get-started.html
│   │   │       ├── icons.html
│   │   │       ├── icons.yml
│   │   │       ├── _includes
│   │   │       │   ├── accessibility
│   │   │       │   │   ├── accessibility-facdn.html
│   │   │       │   │   ├── accessibility-manual.html
│   │   │       │   │   ├── background.html
│   │   │       │   │   ├── cta-cdn-ally.html
│   │   │       │   │   └── other.html
│   │   │       │   ├── ads
│   │   │       │   │   └── carbon.html
│   │   │       │   ├── brand-adblock-warning.html
│   │   │       │   ├── brand-license.html
│   │   │       │   ├── code
│   │   │       │   │   ├── core.less
│   │   │       │   │   ├── core.scss
│   │   │       │   │   └── license.css
│   │   │       │   ├── community
│   │   │       │   │   ├── getting-support.html
│   │   │       │   │   ├── project-milestones.html
│   │   │       │   │   ├── reporting-bugs.html
│   │   │       │   │   ├── requesting-new-icons.html
│   │   │       │   │   └── submitting-pull-requests.html
│   │   │       │   ├── examples
│   │   │       │   │   ├── accessible.html
│   │   │       │   │   ├── animated.html
│   │   │       │   │   ├── basic.html
│   │   │       │   │   ├── bootstrap.html
│   │   │       │   │   ├── bordered-pulled.html
│   │   │       │   │   ├── custom.html
│   │   │       │   │   ├── fixed-width.html
│   │   │       │   │   ├── larger.html
│   │   │       │   │   ├── list.html
│   │   │       │   │   ├── rotated-flipped.html
│   │   │       │   │   └── stacked.html
│   │   │       │   ├── footer.html
│   │   │       │   ├── icons
│   │   │       │   │   ├── accessibility.html
│   │   │       │   │   ├── brand.html
│   │   │       │   │   ├── chart.html
│   │   │       │   │   ├── currency.html
│   │   │       │   │   ├── directional.html
│   │   │       │   │   ├── file-type.html
│   │   │       │   │   ├── form-control.html
│   │   │       │   │   ├── gender.html
│   │   │       │   │   ├── hand.html
│   │   │       │   │   ├── medical.html
│   │   │       │   │   ├── new.html
│   │   │       │   │   ├── payment.html
│   │   │       │   │   ├── spinner.html
│   │   │       │   │   ├── text-editor.html
│   │   │       │   │   ├── transportation.html
│   │   │       │   │   ├── video-player.html
│   │   │       │   │   └── web-application.html
│   │   │       │   ├── jumbotron-carousel.html
│   │   │       │   ├── jumbotron.html
│   │   │       │   ├── modals
│   │   │       │   │   ├── download.html
│   │   │       │   │   └── fa5.html
│   │   │       │   ├── navbar.html
│   │   │       │   ├── new-features.html
│   │   │       │   ├── new-naming.html
│   │   │       │   ├── newsletter-subscribe.html
│   │   │       │   ├── new-upgrading.html
│   │   │       │   ├── products
│   │   │       │   │   ├── camera-retro-tee.html
│   │   │       │   │   ├── classics-tee.html
│   │   │       │   │   ├── cta-suggestions.html
│   │   │       │   │   ├── fa-ther-tee.html
│   │   │       │   │   ├── green-logo-tee.html
│   │   │       │   │   ├── old-skool-tee.html
│   │   │       │   │   ├── rock-paper-scissors-lizard-spock-tee.html
│   │   │       │   │   ├── space-shuttle-tee.html
│   │   │       │   │   └── white-logo-tee.html
│   │   │       │   ├── stripe-ad.html
│   │   │       │   ├── stripe-social.html
│   │   │       │   ├── tell-me-thanks.html
│   │   │       │   ├── tests
│   │   │       │   │   ├── rotated-flipped.html
│   │   │       │   │   ├── rotated-flipped-inside-anchor.html
│   │   │       │   │   ├── rotated-flipped-inside-btn.html
│   │   │       │   │   ├── stacked.html
│   │   │       │   │   ├── stacked-inside-anchor.html
│   │   │       │   │   └── stacked-with-text.html
│   │   │       │   ├── thanks-to.html
│   │   │       │   └── why.html
│   │   │       ├── index.html
│   │   │       ├── _layouts
│   │   │       │   ├── base.html
│   │   │       │   ├── icon.html
│   │   │       │   └── survey.html
│   │   │       ├── license.html
│   │   │       ├── Makefile
│   │   │       ├── _plugins
│   │   │       │   ├── flatten_icon_filters.rb
│   │   │       │   ├── icon_page_generator.rb
│   │   │       │   └── site.rb
│   │   │       ├── README.md-nobuild
│   │   │       ├── store.html
│   │   │       ├── survey.html
│   │   │       ├── test
│   │   │       │   ├── 2.3.2.html
│   │   │       │   ├── all.html
│   │   │       │   ├── glyphicons.html
│   │   │       │   ├── height
│   │   │       │   │   ├── 4.4.0.html
│   │   │       │   │   ├── 4.5.0.html
│   │   │       │   │   └── current.html
│   │   │       │   └── index.html
│   │   │       ├── thanks.html
│   │   │       └── whats-new.html
│   │   └── font-awesome.css
│   └── versions
│       └── web_static_20170822195743.tgz
└── wsgi
    ├── __init__.py
    ├── wsgi_6.py
    ├── wsgi_api.py
    ├── wsgi_hbnb.py
    └── wsgi.py

1304 directories, 2571 files
```