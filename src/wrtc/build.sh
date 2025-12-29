#! /bin/bash

export GOPATH=$(pwd)/pion_wrtc_wrapper/gopath

cd pion_wrtc_wrapper
go get
go build -o wrtc.so -buildmode=c-shared main.go