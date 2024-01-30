import React from 'react';
import { genConst, gridSpacing } from 'store/constant';
import SubscriptionState from 'components/message/SubscriptionState';
//Custom Hook
import { useGetSubscriptionState } from 'hooks/useGetSubscriptionState';
import { msgSubState } from 'store/message';
import { Grid } from '@mui/material';

const Benefits = () => {
  const stateSub = useGetSubscriptionState();

  return (
    <div>
      {stateSub == genConst.CONST_SUB_STATE_ACTIVE ? (
        <>Beneficios</>
      ) : (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SubscriptionState message={msgSubState} submessage={''} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Benefits;
