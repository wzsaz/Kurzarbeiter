from flask import Flask
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/get-token')
def get_token():
  try:
    result = subprocess.run(['powershell.exe', './getToken.ps1'], capture_output=True, text=True)
    return result.stdout.strip()
  except Exception as e:
    return str(e)

if __name__ == '__main__':
  app.run(port=5000)
