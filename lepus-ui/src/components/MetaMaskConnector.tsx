import React from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';

// https://docs.metamask.io/guide/ethereum-provider.html

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

interface Props {
    setAccounts: (accounts: string[]) => void,
}

export default function MetaMaskConnector(props: Props) {
    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = React.useState(false);
    const [accounts, setAccounts] = React.useState([] as string[]);
    const onboarding = React.useRef<MetaMaskOnboarding>();

    React.useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                setButtonText(CONNECTED_TEXT);
                setDisabled(true);
                onboarding.current?.stopOnboarding();
            } else {
                setButtonText(CONNECT_TEXT);
                setDisabled(false);
            }
            props.setAccounts(accounts);
        }
    }, [accounts]);

    React.useEffect(() => {
        function handleNewAccounts(newAccounts: any) {
            setAccounts(newAccounts);
        }
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleNewAccounts);
            window.ethereum.on('accountsChanged', handleNewAccounts);
            return () => {
                window.ethereum.removeListener('accountsChanged', handleNewAccounts);
            };
        }
    }, []);

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((newAccounts: any) => setAccounts(newAccounts));
        } else {
            onboarding.current?.startOnboarding();
        }
    };

    return (
        <>
            <div>MetaMask</div>
            <button disabled={isDisabled} onClick={onClick}>
                {buttonText}
            </button>
        </>
    );
}
