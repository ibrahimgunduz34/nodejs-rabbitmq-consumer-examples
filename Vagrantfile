# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.define "rabbitmq" do |rabbitmq|
        rabbitmq.vm.provider "virtualbox" do |v|
            v.cpus = 2
            v.memory = 512
        end
        rabbitmq.vm.box = "ubuntu/focal64"
        rabbitmq.vm.network "private_network", ip: "192.168.56.10"
        rabbitmq.vm.provision "docker"
        rabbitmq.vm.provision "startup",
            run: "always",
            type: "shell",
            path: "scripts/provision-rabbitmq.sh"
    end

    config.vm.define "app" do |app|
        app.vm.provider "virtualbox" do |v|
            v.cpus = 4
            v.memory = 512
        end
        app.vm.box = "ubuntu/focal64"
        app.vm.network "private_network", ip: "192.168.56.11"
        app.vm.provision "docker"
        app.vm.provision "setup",
                    run: "once",
                    type: "shell",
                    path: "scripts/provision-app.sh"
    end
end
