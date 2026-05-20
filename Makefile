.PHONY: dev assets image install

dev:
	@npm run dev

assets:
	@npm run build

image:
	@docker build -t wikipulse:latest .

install: image
	@cp wikipulse.service /etc/systemd/system/wikipulse.service
	@systemctl daemon-reload
	@systemctl enable wikipulse
	@systemctl restart wikipulse
