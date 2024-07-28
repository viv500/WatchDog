cd server
echo Setting up virtual environment in server directory...
py -m venv venv
echo Activating virtual environment...
.\venv\Scripts\activate
echo Installing Python packages from requirements.txt...
pip install -r requirements.txt
echo Running the server...
py main.py
