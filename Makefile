build:
	cd mysite; pip install -r requirements.txt
run:
	cd mysite; python flask_app.py
venv:
	python3 -m venv ./mysite/venv
