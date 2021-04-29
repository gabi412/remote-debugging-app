#! /bin/bash
filename=$1
compOutName="${filename%.*}-output.txt"
sdcc -mstm8 "${filename}" --out-fmt-ihx --all-callee-saves --debug --verbose --stack-auto --fverbose-asm --float-reent --no-peep &> "${compOutName}"
