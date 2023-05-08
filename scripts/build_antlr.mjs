import { spawnSync } from 'child_process'
import { renameSync } from 'fs'
import { chdir } from 'process'
import { SOURCE_DATE_EPOCH, ensure, encoding, python } from './util.mjs'

const version = '4.12'

console.log('Start build_antlr.mjs.')
ensure(spawnSync(python, ['-m', 'pip', 'download', `antlr4-python3-runtime==${version}`], { encoding }), 'Fail to download antlr4.')

const wheel = `antlr4_python3_runtime-${version}-py3-none-any.whl`
renameSync(`dist/${wheel}`, `../public/${wheel}`)

console.log('Finish build_antlr.mjs.')
