if hash npm == 1; then
    echo "# Updating sources.list"
    sudo apt-get update

    if hash aptitude == 0; then
        echo "# Awesome you already have one of the best package managers!"
    else
        echo "# Installing a better package manager, way better than that shit apt-get (dw it works the exact same)"
        sudo aptitude install -y aptitude
    fi

    echo "# Installing some dependencies"
    sudo aptitude install -y build-essential

    echo "# Installing Node.js 9.x"
    curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
    sudo aptitude install -y nodejs
else
    echo "# Oh you already have node.js? Well let's skip all that stuff and install the bot dependencies!"
fi

echo "# Installing eris module via npm"
npm i eris

echo "# Installing mysql module via npm"
npm i mysql

echo "# Installing async module via npm"
npm i async

echo "# Bot dependencies installation complete. Gl Hf git gud."
