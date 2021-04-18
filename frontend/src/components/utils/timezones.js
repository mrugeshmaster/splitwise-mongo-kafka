const timezones = [
  {
    key: 'Etc/GMT+12',
    value: '(GMT-12:00) International Date Line West',
  },
  {
    key: 'Pacific/Midway',
    value: '(GMT-11:00) Midway Island, Samoa',
  },
  {
    key: 'Pacific/Honolulu',
    value: '(GMT-10:00) Hawaii',
  },
  {
    key: 'US/Alaska',
    value: '(GMT-09:00) Alaska',
  },
  {
    key: 'America/Los_Angeles',
    value: '(GMT-08:00) Pacific Time (US & Canada)',
  },
  {
    key: 'America/Tijuana',
    value: '(GMT-08:00) Tijuana, Baja California',
  },
  {
    key: 'US/Arizona',
    value: '(GMT-07:00) Arizona',
  },
  {
    key: 'America/Chihuahua',
    value: '(GMT-07:00) Chihuahua, La Paz, Mazatlan',
  },
  {
    key: 'US/Mountain',
    value: '(GMT-07:00) Mountain Time (US & Canada)',
  },
  {
    key: 'America/Managua',
    value: '(GMT-06:00) Central America',
  },
  {
    key: 'US/Central',
    value: '(GMT-06:00) Central Time (US & Canada)',
  },
  {
    key: 'America/Mexico_City',
    value: '(GMT-06:00) Guadalajara, Mexico City, Monterrey',
  },
  {
    key: 'Canada/Saskatchewan',
    value: '(GMT-06:00) Saskatchewan',
  },
  {
    key: 'America/Bogota',
    value: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco',
  },
  {
    key: 'US/Eastern',
    value: '(GMT-05:00) Eastern Time (US & Canada)',
  },
  {
    key: 'US/East-Indiana',
    value: '(GMT-05:00) Indiana (East)',
  },
  {
    key: 'Canada/Atlantic',
    value: '(GMT-04:00) Atlantic Time (Canada)',
  },
  {
    key: 'America/Caracas',
    value: '(GMT-04:00) Caracas, La Paz',
  },
  {
    key: 'America/Manaus',
    value: '(GMT-04:00) Manaus',
  },
  {
    key: 'America/Santiago',
    value: '(GMT-04:00) Santiago',
  },
  {
    key: 'Canada/Newfoundland',
    value: '(GMT-03:30) Newfoundland',
  },
  {
    key: 'America/Sao_Paulo',
    value: '(GMT-03:00) Brasilia',
  },
  {
    key: 'America/Argentina/Buenos_Aires',
    value: '(GMT-03:00) Buenos Aires, Georgetown',
  },
  {
    key: 'America/Godthab',
    value: '(GMT-03:00) Greenland',
  },
  {
    key: 'America/Montevideo',
    value: '(GMT-03:00) Montevideo',
  },
  {
    key: 'America/Noronha',
    value: '(GMT-02:00) Mid-Atlantic',
  },
  {
    key: 'Atlantic/Cape_Verde',
    value: '(GMT-01:00) Cape Verde Is.',
  },
  {
    key: 'Atlantic/Azores',
    value: '(GMT-01:00) Azores',
  },
  {
    key: 'Africa/Casablanca',
    value: '(GMT+00:00) Casablanca, Monrovia, Reykjavik',
  },
  {
    key: 'Etc/Greenwich',
    value: '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
  },
  {
    key: 'Europe/Amsterdam',
    value: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  },
  {
    key: 'Europe/Belgrade',
    value: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  },
  {
    key: 'Europe/Brussels',
    value: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris',
  },
  {
    key: 'Europe/Sarajevo',
    value: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
  },
  {
    key: 'Africa/Lagos',
    value: '(GMT+01:00) West Central Africa',
  },
  {
    key: 'Asia/Amman',
    value: '(GMT+02:00) Amman',
  },
  {
    key: 'Europe/Athens',
    value: '(GMT+02:00) Athens, Bucharest, Istanbul',
  },
  {
    key: 'Asia/Beirut',
    value: '(GMT+02:00) Beirut',
  },
  {
    key: 'Africa/Cairo',
    value: '(GMT+02:00) Cairo',
  },
  {
    key: 'Africa/Harare',
    value: '(GMT+02:00) Harare, Pretoria',
  },
  {
    key: 'Europe/Helsinki',
    value: '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
  },
  {
    key: 'Asia/Jerusalem',
    value: '(GMT+02:00) Jerusalem',
  },
  {
    key: 'Europe/Minsk',
    value: '(GMT+02:00) Minsk',
  },
  {
    key: 'Africa/Windhoek',
    value: '(GMT+02:00) Windhoek',
  },
  {
    key: 'Asia/Kuwait',
    value: '(GMT+03:00) Kuwait, Riyadh, Baghdad',
  },
  {
    key: 'Europe/Moscow',
    value: '(GMT+03:00) Moscow, St. Petersburg, Volgograd',
  },
  {
    key: 'Africa/Nairobi',
    value: '(GMT+03:00) Nairobi',
  },
  {
    key: 'Asia/Tbilisi',
    value: '(GMT+03:00) Tbilisi',
  },
  {
    key: 'Asia/Tehran',
    value: '(GMT+03:30) Tehran',
  },
  {
    key: 'Asia/Muscat',
    value: '(GMT+04:00) Abu Dhabi, Muscat',
  },
  {
    key: 'Asia/Baku',
    value: '(GMT+04:00) Baku',
  },
  {
    key: 'Asia/Yerevan',
    value: '(GMT+04:00) Yerevan',
  },
  {
    key: 'Asia/Kabul',
    value: '(GMT+04:30) Kabul',
  },
  {
    key: 'Asia/Yekaterinburg',
    value: '(GMT+05:00) Yekaterinburg',
  },
  {
    key: 'Asia/Karachi',
    value: '(GMT+05:00) Islamabad, Karachi, Tashkent',
  },
  {
    key: 'Asia/Calcutta',
    value: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
  },
  {
    key: 'Asia/Calcutta',
    value: '(GMT+05:30) Sri Jayawardenapura',
  },
  {
    key: 'Asia/Katmandu',
    value: '(GMT+05:45) Kathmandu',
  },
  {
    key: 'Asia/Almaty',
    value: '(GMT+06:00) Almaty, Novosibirsk',
  },
  {
    key: 'Asia/Dhaka',
    value: '(GMT+06:00) Astana, Dhaka',
  },
  {
    key: 'Asia/Rangoon',
    value: '(GMT+06:30) Yangon (Rangoon)',
  },
  {
    key: 'Asia/Bangkok',
    value: '(GMT+07:00) Bangkok, Hanoi, Jakarta',
  },
  {
    key: 'Asia/Krasnoyarsk',
    value: '(GMT+07:00) Krasnoyarsk',
  },
  {
    key: 'Asia/Hong_Kong',
    value: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
  },
  {
    key: 'Asia/Kuala_Lumpur',
    value: '(GMT+08:00) Kuala Lumpur, Singapore',
  },
  {
    key: 'Asia/Irkutsk',
    value: '(GMT+08:00) Irkutsk, Ulaan Bataar',
  },
  {
    key: 'Australia/Perth',
    value: '(GMT+08:00) Perth',
  },
  {
    key: 'Asia/Taipei',
    value: '(GMT+08:00) Taipei',
  },
  {
    key: 'Asia/Tokyo',
    value: '(GMT+09:00) Osaka, Sapporo, Tokyo',
  },
  {
    key: 'Asia/Seoul',
    value: '(GMT+09:00) Seoul',
  },
  {
    key: 'Asia/Yakutsk',
    value: '(GMT+09:00) Yakutsk',
  },
  {
    key: 'Australia/Adelaide',
    value: '(GMT+09:30) Adelaide',
  },
  {
    key: 'Australia/Darwin',
    value: '(GMT+09:30) Darwin',
  },
  {
    key: 'Australia/Brisbane',
    value: '(GMT+10:00) Brisbane',
  },
  {
    key: 'Australia/Canberra',
    value: '(GMT+10:00) Canberra, Melbourne, Sydney',
  },
  {
    key: 'Australia/Hobart',
    value: '(GMT+10:00) Hobart',
  },
  {
    key: 'Pacific/Guam',
    value: '(GMT+10:00) Guam, Port Moresby',
  },
  {
    key: 'Asia/Vladivostok',
    value: '(GMT+10:00) Vladivostok',
  },
  {
    key: 'Asia/Magadan',
    value: '(GMT+11:00) Magadan, Solomon Is., New Caledonia',
  },
  {
    key: 'Pacific/Auckland',
    value: '(GMT+12:00) Auckland, Wellington',
  },
  {
    key: 'Pacific/Fiji',
    value: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.',
  },
  {
    key: 'Pacific/Tongatapu',
    value: '(GMT+13:00) Nuku&apos;alofa',
  },
];
export default timezones;
