import React, {useState} from 'react'
import {TestStore} from '@/store'

export function useQiankunStateForSlave() {
  const [masterCount, setMasterCount] = useState(TestStore.count);
  TestStore.setCount(masterCount)
  return {
    masterCount,
    setMasterCount
  }
}
