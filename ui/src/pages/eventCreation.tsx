import React, { useState, useEffect } from 'react';
import { Button } from '../../app/components/button/Button';
import { Alert } from '../../app/components/alert/Alert';
import Candidates from '../_components/candidates/candidates';
import { useLocalStorage } from '../../app/hooks';

export default function EventCreation() {
  const [candidate, setCandidate] = useState<number>(-1);
  const [transactionLink, setTransactionLink] = useState<string>('');
  const [alert, setAlert] = useState({ message: '', error: false });
  const { connectWallet, vote, isWalletConnected, isVoting } = useMinaBlockchain();

  const handleVote = async () => {
    try {
      const transactionHash = await vote(candidate);
      setTransactionLink(`https://minaexplorer.com/transaction/${transactionHash}`);
    } catch (error) {
      setAlert({ message: 'Error during voting', error: true });
    }
  };

  useEffect(() => {
    // Logic to check wallet connection or other initial setups
  }, []);

  return (
    <div>
      <Alert message={alert.message} isError={alert.error} />
      <Candidates onCandidateSelect={setCandidate} />
      {!isWalletConnected && (
        <Button text="Connect Wallet" onClick={connectWallet} />
      )}
      {isWalletConnected && (
        <Button text="Vote" onClick={handleVote} disabled={candidate < 0 || isVoting} />
      )}
      <Button text="View Transaction" href={transactionLink} />
    </div>
  );
}
