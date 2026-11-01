export const APP_VERSION='0.9.2';
export const APP_REVISION='070';
export function releaseURL(current,revision){if(!/^\d{3,8}$/.test(revision))throw Error('Versão de atualização inválida.');const url=new URL(current);url.searchParams.set('v',revision);return url.href;}
export async function checkRelease(fetcher=fetch){const response=await fetcher('./version.json?check='+Date.now(),{cache:'no-store'});if(!response.ok)throw Error('Não foi possível verificar a atualização. Tente com internet.');const release=await response.json();if(!/^\d+\.\d+\.\d+$/.test(release.version)||!/^\d{3,8}$/.test(release.revision))throw Error('Resposta de atualização inválida. Tente novamente.');return release;}
