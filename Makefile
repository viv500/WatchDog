build:
	cd server; pip install -r requirements.txt
run:
	cd server; python main.py
venv:
	python3 -m venv ./server/venv
