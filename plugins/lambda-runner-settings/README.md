# dummy

> This is a frontend plugin.

## Developer Notes

Note: The `package.json` file is intentionally located in the `src` folder so that node modules get installed in there.

There's an issue even with node 6 where if you `npm install --prefix ./src` it will correctly install to the `src` folder but won't save anything in `package.json` so a simple workaround is to move the package file to avoid having to use `--prefix` in the install.
