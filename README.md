# Hide titles mod

Totally rewritten script original based on Hide titles kwin script created by [@bahamondev](https://github.com/bahamondev/hide-titles).
This scipt has support for multiple screen, csd and exclusion list.

# Release

Version: 1.0.2 - Rewrite from zero.
Version: 1.0.1 - Modified Hide titles script from [@bahamondev](https://github.com/bahamondev/hide-titles).

## Setup

### Build

Just run `make build`. That will create a zip file with plugin contents and rename it to the `.kwinscript` extension.
If you want to manually build the script then:

1. Compress the `contents` folder and the `metadata.desktop` file into a zip
2. Rename the zip to `hide-titles-mod.kwinscript`

### Install

Go to the project folder and run `make install`. That should clean and uninstall previous builds, perform a new build and install the plugin in the system.

If you want to manually install the script:

```sh
plasmapkg2 -t kwinscript -i hide-titles-mod.kwinscript
```

### Uninstall

Run `make uninstall`.

### Features

Removes the window title on maximized window that are not in exclusion list and on screen 0.
For change the list or the screen edit the script variables.

And never applies on windows that always start without window borders (ie, latte dock, Application Menu widget...).

## Reference

Hide title - by [@bahamondev](https://bahamonde.dev).

## License

This project is licensed under the GPLv3 License - see the LICENSE.md file for details.
