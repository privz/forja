import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
test('publicação não contém dados locais, credenciais ou documentos privados',()=>{
 const files=execFileSync('git',['ls-files'],{encoding:'utf8'}).trim().split(/\r?\n/);
 const forbidden=/(^|\/)(\.env(?:\..*)?|PLANEJAMENTO\.md|GUIA-IPHONE\.md|backups|private|exports|local-data)(\/|$)|forja-(backup|widget)-.*\.json$|\.(pem|key|p12)$/i;
 assert.deepEqual(files.filter(f=>forbidden.test(f)),[]);
});
