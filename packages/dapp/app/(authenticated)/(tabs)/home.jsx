import { useState, useCallback, useEffect } from 'react';
import { Box, Text, Button, Icon, FlatList, Spinner } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';
import {
  FeatureHomeCard,
  TransactionItem,
  SectionHeader,
  FeaturedAssets,
  NoItems,
} from '../../../components';
import { rates } from '../../../utils';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
//import { getWalletTxs, useGetTxsByAddrQuery, useGetTokenTxsQuery } from 'dapp/services';
//import { getTokenBalances } from 'dapp/contracts';

export default function HomeScreen() {
  const { hasAccount: account, isSignerSet } = useSelector((s) => s.essential);
  const router = useRouter();

  const [balance, setBalance] = useState({
    celoBal: 0,
    cusdBal: 0,
    balUSD: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingBal, setIsLoadingBal] = useState(false);

  const txIsLoading = false;
  const ercIsLoading = false;
  /*
  const {
    data: accountTxs,
    refetch: refetchTxs,
    error: txError,
    isLoading: txIsLoading,
  } = useGetTxsByAddrQuery(account.address);
  const {
    data: erc20Txs,
    refetch: refetchErc20Txs,
    error: ercError,
    isLoading: ercIsLoading,
  } = useGetTokenTxsQuery(account.address);*/

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    //handleBalances();
    //refetchTxs();
    //refetchErc20Txs();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);
  /*
  useEffect(() => {
    //const getBalances = async () => {};
    const unsubscribe = navigation.addListener('focus', () => {
      handleBalances();
      refetchTxs();
      refetchErc20Txs();
    });
    return unsubscribe;
  }, [account.address, navigation]);

  useEffect(() => {
    if (!txIsLoading && !ercIsLoading) {
      const thisTxs = getWalletTxs(accountTxs, erc20Txs, account.address);
      setTransactions(thisTxs);
    }
  }, [accountTxs, erc20Txs]);

  const handleBalances = async () => {
    setIsLoadingBal(true);
    const thisBalances = await getTokenBalances(isSignerSet, account.address);
    if (thisBalances !== null) {
      const { celoBal, cusdBal } = thisBalances;
      if (!!celoBal || !!cusdBal) {
        setIsLoadingBal(false);
        setBalance({
          celoBal,
          cusdBal,
          balUSD: celoBal * rates.CELOUSD + cusdBal * rates.CUSDUSD,
        });
      }
    }
    setIsLoadingBal(false);
  };*/
  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <FlatList
        width="98%"
        //width="full"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={transactions.slice(0, 5)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Box mt="4">
            <FeatureHomeCard
              color="warmGray.800"
              bg="white"
              balance={balance.balUSD.toFixed(2)}
              apprxBalance={
                isLoadingBal ? 'isFetchingBal' : (balance.balUSD * rates.USDKES).toFixed(2)
              }
              btn1={{
                icon: <Icon as={Feather} name="plus" size="md" color="primary.600" mr="1" />,
                name: 'Deposit',
                screen: 'deposit',
              }}
              btn2={{
                icon: <Icon as={Feather} name="arrow-right" size="md" color="primary.600" mr="1" />,
                name: 'Transfer',
                screen: 'transfer',
                params: balance,
              }}
              btn3={{
                icon: <Icon as={Feather} name="arrow-down" size="md" color="primary.600" mr="1" />,
                name: 'Withdraw',
                screen: 'transfer',
                params: balance,
              }}
              /*btn4={{
                icon: <Icon as={Feather} name="more-horizontal" size="lg" color="primary.600" />,
                name: 'more',
                screen: 'DummyModal',
              }}*/
              itemBottom={false}
            />
            <SectionHeader
              title="Assets"
              actionText="Swap"
              action={() => router.navigate('DummyModal')}
            />
            <FeaturedAssets nativeBal={balance.celoBal} stableBal={balance.cusdBal} />
            <SectionHeader
              title="Transactions"
              actionText="See all"
              action={() => router.navigate('AllTxs')}
            />
            {transactions.length > 0 ? null : txIsLoading || ercIsLoading ? (
              <Spinner size="lg" />
            ) : (
              <NoItems
                title="No Transactions yet"
                message="Your transactions will show here."
                action={() => router.navigate('(authenticated)/deposit')}
                actionText="Add funds"
              />
            )}
          </Box>
        }
        renderItem={({ item, index }) => (
          <Box
            bg="white"
            opacity={85}
            roundedTop={index === 0 ? '2xl' : 'md'}
            roundedBottom={index === transactions.length - 1 || index === 5 ? '2xl' : 'md'}
            mt={1}
          >
            <TransactionItem
              key={item.id}
              credited={item.credited}
              trTitle={item.title}
              trDate={item.date}
              spAmount={
                (item.credited ? '+' : '-') + (item.amount * 1).toFixed(3) + ' ' + item.token
              }
              eqAmount={
                (item.amount * (item.token === 'CELO' ? rates.CELOKES : rates.CUSDKES)).toFixed(2) +
                ' KES'
              }
              screen="TxDetails"
              params={item}
            />
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
