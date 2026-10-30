<template>
  <pre class="code"><span class="k">policy</span>    <span class="v">Payments</span>  <span class="k">v3  production</span>

<span class="k">rule</span>      <span class="v">payments.transfer</span>
<span class="k">when</span>      <span class="v">amount &gt; 1000 AND currency == "USD"</span>
<span class="k">decision</span>  <span class="a">approval_required</span>

<span class="k">rule</span>      <span class="v">payments.transfer</span>
<span class="k">when</span>      <span class="v">true</span>
<span class="k">decision</span>  <span class="ok">allow</span>

<span class="k">rule</span>      <span class="v">db.drop_table</span>
<span class="k">when</span>      <span class="v">true</span>
<span class="k">decision</span>  <span class="a">deny</span></pre>
</template>
