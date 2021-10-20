.PHONY = clean build uninstall install

clean:
	@echo "Cleaning..."
	@rm -f hide-titles-mod.kwinscript

build: clean
	@echo "Building..."
	@zip hide-titles-mod.kwinscript -r contents LICENSE metadata.desktop

uninstall:
	@echo "Removing hide-titles script..."
	@-plasmapkg2 -t kwinscript -r hide-titles-mod.kwinscript

install: uninstall build
	@echo "Installing hide-titles..."
	@plasmapkg2 -t kwinscript -i hide-titles-mod.kwinscript
	@rm -f hide-titles-mod.kwinscript

debug:
	qdbus-qt5 org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.showInteractiveKWinConsole
