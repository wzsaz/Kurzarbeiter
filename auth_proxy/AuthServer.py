from flask import Flask
from flask_cors import CORS
import subprocess
import logging

app = Flask(__name__)
CORS(app)

console = logging.StreamHandler()
console.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
logging.getLogger('').addHandler(console)

@app.route('/get-token')
def get_token():
  app.logger.info("Fetching new token...")
  try:
    result = subprocess.run(['powershell.exe', './auth_proxy/getToken.ps1'], capture_output=True, text=True)
    formattedresult = result.stdout.strip()
    app.logger.info('Result: %s', formattedresult)  # Log the result
    return formattedresult
  except Exception as e:
    app.logger.error('Error occurred: %s', e)  # Log the error
    return str(e)

if __name__ == '__main__':
  app.run(port=5000, debug=True)
