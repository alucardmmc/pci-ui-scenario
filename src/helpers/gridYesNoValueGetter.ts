const gridYesNoValueGetter = (params: any) => {
  const value = params.data?.pha;

  switch(value) {
    case 'Y':
      return 'Yes';
    case 'N':
      return 'No';
  }

  return '';
}

export default gridYesNoValueGetter;
