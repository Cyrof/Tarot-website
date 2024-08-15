from pathlib import Path
import os
import subprocess

def container_exists(container_name):
    """Check if a Docker container exists."""
    result = subprocess.run(
        ["docker", "ps", "-a", "--filter", f"name={container_name}", "--format", "{{.Names}}"],
        stdout=subprocess.PIPE, text=True
    )
    return container_name in result.stdout

def start_or_create_container():
    """Start the existing MongoDB container or create and start it if it doesn't exist."""
    container_name = "mongo-next"  # This should match the container_name in mongodb.yaml
    parent_dir = os.path.dirname(os.path.realpath(__file__))
    mongodb_path = f"{parent_dir}/mongodb.yaml"
    
    if container_exists(container_name):
        print(f"Container '{container_name}' exists. Starting container...")
        subprocess.run(f"docker start {container_name}", shell=True, check=True)
    else:
        print(f"Container '{container_name}' does not exist. Creating and starting container...")
        mongo_command = f"docker compose -f {mongodb_path} up -d"
        subprocess.run(mongo_command, shell=True, check=True)

def start_nextjs_server():
    """Start the Next.js server using npm."""
    subprocess.run("npm run dev", shell=True, check=True)

def main():
    start_or_create_container()
    start_nextjs_server()

if __name__ == "__main__":
    main()
