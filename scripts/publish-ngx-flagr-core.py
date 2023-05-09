import json
import os
import subprocess

# Define log color codes and function
cyan = '\033[0;36m'
no_color = '\033[0m'

def log(msg):
    print(f'{cyan}[LOG]{no_color} {msg}')

# Define error function
def error(msg):
    print(f'\033[0;31m[ERROR] {msg}\033[0m')
    exit(1)

# Set the working directory to the root of the git repository
log("Setting working directory to the root of the git repository ...")
try:
    repo_root = subprocess.run(['git', 'rev-parse', '--show-toplevel'], capture_output=True, text=True, check=True).stdout.strip()
    os.chdir(repo_root)
    log(f"Working directory set to: {os.getcwd()}")
except subprocess.CalledProcessError as e:
    error(f"Failed to get the root directory of the git repository: {e.stderr.strip()}")

# Navigate to the library's build output directory
log("Navigating to the library's build output directory ...")
lib_dir = os.path.join('dist', '@ngx-flagr', 'core')
if not os.path.isdir(lib_dir):
    error("Library output directory not found.")
os.chdir(lib_dir)

# Get the current version of the library
log("Getting the current version of the library ...")
try:
    with open('package.json') as f:
        package_data = json.load(f)
        version = package_data.get('version')
    if not version:
        error("Failed to get the version from package.json")
    else:
        log(f"Current version is set to {version}")
except (FileNotFoundError, json.JSONDecodeError) as e:
    error(f"Failed to read package.json: {e}")

# Set the organization name
org_name = '@ngx-flagr'

# Set the library name
library_name = 'core'

# Set the library scope
library_scope = f'{org_name}/{library_name}'
log(f"Library scope: {library_scope}")

# Set access to public
os.system('npm config set access public')

# Confirm before publishing
reply = input(f"Are you sure you want to publish version {version} of {library_scope}? (y/n) ")
if not reply.lower().startswith('y'):
    log("Publishing canceled.")
    exit()

# Log in to npm
log("Logging in to npm ...")
os.system('npm login')

# Publish the library to the organization's scope
log("Publishing the library to the organization's scope ...")
try:
    os.system('npm publish')
    log(f"Library published on https://www.npmjs.com/package/{library_scope}")
except subprocess.CalledProcessError as e:
    error(f"Failed to publish the library: {e.stderr.strip()}")
