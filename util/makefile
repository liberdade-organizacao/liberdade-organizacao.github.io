default: install

install: install-fpcl install-gtd

install-fpcl:
	git clone https://github.com/ishiikurisu/failproof-web fpcl
	cd fpcl; rm -rf .git

install-gtd:
	git clone https://github.com/ishiikurisu/gtd
	cd gtd; rm -rf .git

clean:
	rm -rf fpcl gtd
