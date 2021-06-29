import {EntityRepository} from './EntityRepository';
import {Account} from './Account';
import {AccountWithEncryptedPassword} from './AccountWithEncryptedPassword';

interface AccountRepository extends EntityRepository<Account> {

  findAccountWithEncryptedPasswordByEmail(email: string): Promise<AccountWithEncryptedPassword | null>;

  isUsernameAvailable(username: string): Promise<boolean>;

  isEmailAvailable(email: string): Promise<boolean>;

}

export {AccountRepository};
