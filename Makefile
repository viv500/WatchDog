build:
	cd mysite; pip install -r requirements.txt
run:
	cd mysite; python main.py
venv:
	python3 -m venv ./mysite/venv
