
import { Connect, SimpleSigner } from 'uport-connect'

export const uport = new Connect('bbBasicApp', {
  clientId: '2oujSyFB5ua4WQYdndzq31xc22kBNRZNxNZ',
  network: 'rinkeby',
  signer: SimpleSigner('4bca4b663db8e626ad1ae38f430fbe9c3179399cd72feb81db477ff6383950e7')
});

