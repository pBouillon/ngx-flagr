import argparse
import json
import os
import subprocess

# Define log color codes and function
gray = '\033[1;30m'
green = '\033[0;32m'
no_color = '\033[0m'

def log_info(msg):
    print(f'{green}[INFO]{no_color} {msg}')

def log_debug(msg):
    print(f'{gray}[DBG] {msg}{no_color}')

# Define error function
def error(msg):
    print(f'\033[0;31m[ERROR] {msg}\033[0m')
    exit(1)

# Create argument parser
parser = argparse.ArgumentParser(description='Build and publish ngx-flagr library')
parser.add_argument('--project', help='Name of the project to publish')

# Parse command line arguments
args = parser.parse_args()

# Get the project name from the command line arguments
project_name = args.project

# Validate project name
valid_projects = ['core', 'routing']

if not project_name:
  error(f"Missing project name, specify it with --project=xxx. Available projects: {', '.join(valid_projects)}")

if project_name not in valid_projects:
    error(f"Invalid project name. Available projects: {', '.join(valid_projects)}")

log_info(f'Running publish pipeline for {project_name}')

# Set the working directory to the root of the git repository
log_debug("Setting working directory to the root of the git repository ...")
try:
    repo_root = subprocess.run(['git', 'rev-parse', '--show-toplevel'], capture_output=True, text=True, check=True).stdout.strip()
    os.chdir(repo_root)
    log_debug(f"Working directory set to: {os.getcwd()}")
except subprocess.CalledProcessError as e:
    error(f"Failed to get the root directory of the git repository: {e.stderr.strip()}")

# Navigate to the library's build output directory
log_debug("Navigating to the library's build output directory ...")
lib_dir = os.path.join('dist', '@ngx-flagr', 'core')
if not os.path.isdir(lib_dir):
    error("Library output directory not found.")
os.chdir(lib_dir)

# Get the current version of the library
log_debug("Getting the current version of the library ...")
try:
    with open('package.json') as f:
        package_data = json.load(f)
        version = package_data.get('version')
    if not version:
        error("Failed to get the version from package.json")
    else:
        log_info(f"Current version is set to {version}")
except (FileNotFoundError, json.JSONDecodeError) as e:
    error(f"Failed to read package.json: {e}")

# Set the organization name
org_name = '@ngx-flagr'

# Set the library name
library_name = 'core'

# Set the library scope
library_scope = f'{org_name}/{library_name}'
log_debug(f"Library scope: {library_scope}")

# Set access to public
os.system('npm config set access public')

# Confirm before publishing
reply = input(f"{green}?{no_color} Are you sure you want to publish version {version} of {library_scope}? {gray}(y/N){no_color} ")
if not reply.lower().startswith('y'):
    log_debug("Publishing canceled.")
    exit()

# Publish the library to the organization's scope
log_debug("Publishing the library to the organization's scope ...")
try:
    os.system('npm publish')
    log_info(f"Library published on https://www.npmjs.com/package/{library_scope}")
except subprocess.CalledProcessError as e:
    error(f"Failed to publish the library: {e.stderr.strip()}")
