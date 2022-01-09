import namor from 'namor';

const newPool = () => {
  return {
    poolName: namor.generate({ words: 2, numbers: 0 }),
    vApr: Math.floor(Math.random() * 30) + '%',
    tvl: Math.floor(Math.random() * 100000),
  };
};

export const makeDummyData = (len: number) =>
  [...new Array(len)].map(d => newPool());
