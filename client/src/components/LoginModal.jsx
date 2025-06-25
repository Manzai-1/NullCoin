import { useState } from "react";
import {Button} from './Button.jsx';
import { SelectInput } from './SelectInput.jsx';
import {TextInput} from './TextInput.jsx';

export const LoginModal = ({
    updateUsername,
    updatePassword,
    updateRole,
    handleRegisterUser,
    handleLoginUser,
    onClose,
}) => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <TextInput text='Username' action={updateUsername} />
                <TextInput text='Password' action={updatePassword} />
                {isRegistering ? (
                    <>
                        <SelectInput
                            options={['user', 'miner', 'admin']}
                            action={updateRole}
                        />
                        <Button
                            text={'Register'}
                            action={() => {
                                handleRegisterUser();
                                onClose();
                            }}
                            disable={false}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            text={'Register new user'}
                            action={() => {
                                setIsRegistering(true);
                            }}
                            disable={false}
                        />
                        <Button
                            text={'Login'}
                            action={() => {
                                handleLoginUser();
                                onClose();
                            }}
                            disable={false}
                        />
                    </>
                )}
            </div>
        </div>
    );
};