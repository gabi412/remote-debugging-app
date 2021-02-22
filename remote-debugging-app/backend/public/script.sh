#! /bin/bash
#folder="output-files"
#cd "./programs-sent"
#path="/home/gabi/backend/public/programs-sent/${folder}"
#cp "$1" "${folder}"
#mkdir -p "${path}"
#cp "./programs-sent/${$1}" "${path}"
#cd "${path}"
filename=$1
compOutName="${filename%.*}-output.txt"
sdcc -mstm8 "${filename}" --out-fmt-ihx --all-callee-saves --debug --verbose --stack-auto --fverbose-asm --float-reent --no-peep &> "${compOutName}"
