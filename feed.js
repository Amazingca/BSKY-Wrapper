import { post } from "./struct.js";
import { getUserRepo, listRecords } from "./api.js";
export const userCache = ["did:plc:yk4dd2qkboz2yv6tpubpc6co","did:plc:r5dkjie2lfywt2yjtygkwtgp","did:plc:6fktaamhhxdqb2ypum33kbkj","did:plc:s6zls33c575xfnlx2koycdgy","did:plc:me7jdq7tyswm4tivjqmsxuxo","did:plc:yeec2dqb2lrcbsdreca6szff","did:plc:ndbwqslzrica3slvj3nlyzcj","did:plc:qhptg7ge32txpsvknx6lrbur","did:plc:veeun74s3c6v2hfcinejcbx6","did:plc:imvk33pgsyoig6cvt6omwb3t","did:plc:4usllmhbbh57ba66t2sevlrl","did:plc:wqgdnqlv2mwiio6pfchwtrff","did:plc:q3jw5ut4ytwtrfvkn7n6mlqd","did:plc:o5tqfvsr5qwofe3icp7a6z6j","did:plc:gnmc53xy3rhbyepipqv2b3rl","did:plc:3f52o3x6r7mpchxajcwn4vco","did:plc:yoj2atdv4wrphd4x3hok2hmd","did:plc:iztv76aq7fbpxmyjwqv5vrhz","did:plc:hu354h4z2pu2ju3e4ualauqq","did:plc:if2tug5buc5a3crz2d2i24i3","did:plc:e4ybkxvnjdzjaszbybekjyms","did:plc:pmehoh7nqjfzrkkiudh7c3ax","did:plc:qqzutbxtul2oekubp7wjcitz","did:plc:7aw7gdcbux364jt4uvs6zrj6","did:plc:tgfzv5irks5acnmk75j4elky","did:plc:njubhwgks46s5fq5rksfz6nd","did:plc:fdwjo43qrbnccb4wkfogtxbk","did:plc:jf6cuqweurcbdhpupgtftssq","did:plc:ubtpz22ea37bb7wztmroiuqu","did:plc:wdei7ye75zmu6tjleezzbsjo","did:plc:or4icvgnvxsl2ofthjsvz24d","did:plc:pm6jxakrtzmkorra62cr43kr","did:plc:2q5oupusyl5i5jwba3jtk3ri","did:plc:336v7sgkf6ycvuwnb65rx5qr","did:plc:ybi44m2fwowkwzxfckv3hyno","did:plc:6al5t6ei6z6p4wzpmhpmwmdw","did:plc:2cxgdrgtsmrbqnjkwyplmp43","did:plc:5wk5wsvdpxr3b4sncfgf2app","did:plc:rqyxbvmx6htf5fwfnltvqzat","did:plc:cr26c7oguulx6ipxdy6bf2it","did:plc:fjsmdevv3mmzc3dpd36u5yxc","did:plc:ragtjsm2j2vknwkz3zp4oxrd","did:plc:vzmlifz3ghar4cu2hj3srga2","did:plc:7axcqwj4roha6mqpdhpdwczx","did:plc:gfdcef26d62oy3pz2jclqkaj","did:plc:qjeavhlw222ppsre4rscd3n2","did:plc:gbhvjwaxhiies2qcmdmdnwy5","did:plc:xutnox3ftsppgokcvr5os6om","did:plc:mn5nyf6pujwnikxjkxyu3u7h","did:plc:akyopoapqza6xjzthjnandaz","did:plc:w5lm6utpdvsg5spyybh76sae","did:plc:bapnorbjvs43bojtwki62mpd","did:plc:44ybard66vv44zksje25o7dz","did:plc:o2hywbrivbyxugiukoexum57","did:plc:at3xdn4twdcgow4uvzozjxop","did:plc:py2h6hogyec6bd4tyzafwv2x","did:plc:hbfkgnstjlgkaa57pcjkaf25","did:plc:4nb5ighj5i5lfqsjj4iemgas","did:plc:vjug55kidv6sye7ykr5faxxn","did:plc:oky5czdrnfjpqslsw2a5iclo","did:plc:esodreswicorpgkoepoqbdl5","did:plc:4hivxx2dyvmt7xyxii5m7foe","did:plc:tofqwadfexpj2sw2q2abwe4p","did:plc:ua6usdc4hzvzjsokoenba4zt","did:plc:4xvfoljklsvq326kk3i6sgfi","did:plc:tpg43qhh4lw4ksiffs4nbda3","did:plc:mleqlhvvzkt7omvlya3sfre3","did:plc:u2nphxzwzgl73yjvsbn7d4cg","did:plc:z4kxliqf7m2gfnapliqlkumw","did:plc:pqlvkatzwlic3nvek6srxwjy","did:plc:tsk5huy4xspr4ku3smmrhe5k","did:plc:jhclbqfxc4w5unkpfuwpe4ce","did:plc:erza6cd5gefflbykwjtvfwbx","did:plc:sjdy3hnkzknl6jjat5bdggef","did:plc:pomrgqhag4t6pvrl5necxqq3","did:plc:qlcbqt26tt6oje62tve2m7w6","did:plc:qnk5lcl46adjiwniu7q6rt54","did:plc:afb274qkf6emjuhdfu3o7ggn","did:plc:ejb7grdekylalejwnbw4btgt","did:plc:x2wnqtyzpyhs27xjpkxikf3x","did:plc:6nvbzutsgdtou45xqkjpkjuz","did:plc:nb45ciey4zcmiennmrlnn6bc","did:plc:g2q2yxjlb6kexudg5xagqwis","did:plc:vpkhqolt662uhesyj6nxm7ys","did:plc:mxdqvruhze7qxiessj6isga2","did:plc:oypgij57lv3ytni32p2jqbce","did:plc:vwcvjmj3sxgaxokunwzkhzom","did:plc:mmuor37pz56qlbddt2hv3tpe","did:plc:5mqrsk4fb6jdkbtdemlavuzx","did:plc:l5ubox2264vtrpl2lla2drdf","did:plc:ss7my2d633xvutojmlia2kbr","did:plc:2k7juufln3ne2qs7qjc5pdix","did:plc:ch7azdejgddtlijyzurfdihn","did:plc:t6j2np3furk7rfthx6soxeph","did:plc:fwhvp4j7dorchczd2sjfleoo","did:plc:ss7soegenrgbxcewxhfmtxdx","did:plc:vhju6pug3mqz4i2ntx47r5as","did:plc:by3mi3gmmaupxi6x56v2rerh","did:plc:hd5g6z5wauicendc3zilioir","did:plc:e2nwnarqo7kdbt7ngr3gejp6","did:plc:x37liwax4fxotpumelqu4pmu","did:plc:lsz27iba6myqfhatwihmyfzz","did:plc:hv3tzygvckr6tyzzkbwexpgl","did:plc:6bkqyo6c3fpzx4ecuq65j373","did:plc:oc6vwdlmk2kqyida5i74d3p5","did:plc:l3rouwludahu3ui3bt66mfvj","did:plc:s5pbcofzgcgdhl3aqw7zvob7","did:plc:cwx2zxldt3uxciob3nxzhkzr","did:plc:6umh2rqttv3dxohq7gaxjk36","did:plc:d26lpcjh5haqpmy225kgc23e","did:plc:egpxmsya32mhhh5smd375vcx","did:plc:cwkdw675dj5rsnpgttobk3fk","did:plc:nr55rexy4s2we22j56d4n46b","did:plc:wptnzi6wyzqltbenxapqa5qd","did:plc:xl4nejvjc52uhp25mceh3f7q","did:plc:jzx2rvqsq2rpri2rikwqdoqj","did:plc:dimjrgeatypdz72m4okacmrt","did:plc:n6com3b6tkpq76vr5n7xqutu","did:plc:qsispj34ogpfpoxodpdrqncw","did:plc:ndzftkdshpxde5wt33ndpjdg","did:plc:ymdx5ssbzyhxttf6pkongcjw","did:plc:kyzoscapaac55jyw3zubfiod","did:plc:uqzpqmrjnptsxezjx4xuh2mn","did:plc:bnqkww7bjxaacajzvu5gswdf","did:plc:cov5jirdvelnzyzjirbdq2s5","did:plc:652rzzvvceyeht7tft5hmch6","did:plc:6akyvwcjf7u5rcmq6kzcltla","did:plc:6f2lm6ma2dlnmdss3pf65gnd","did:plc:zvfbpinehieygw4mhvzcuehy","did:plc:bx7dnzf2b55bxzyepbed52qk","did:plc:a3zea7slcuhagrvntjbqk74e","did:plc:tft77e5qkblxtneeib4lp3zk","did:plc:k4c4qbyhcjjlsgtm252rilsx","did:plc:2wqb5jjkxli4rcswpyb624xj","did:plc:7r5c5jhtphcpkg3y55xu2y64","did:plc:vkpeox45fjvt7lxqa5qw33yn","did:plc:4qzenu7snwpxxeh5yxgbni3f","did:plc:wmhp7mubpgafjggwvaxeozmu","did:plc:qmhqdkthno5d46nrthghndip","did:plc:zqsakln5z6rnbg24c46gaboy","did:plc:kztnhmdr7q6yurcbwswh4dc7","did:plc:5jeqch7q4bzoz2jmunc5qynk","did:plc:mfevdhofv5ibx4mdnhlvgnlu","did:plc:xl623go4ebk7vytyrqwhyau3","did:plc:3ovlqkndffifdbmfblxnfymz","did:plc:etsxtxicov2635bk44gp3jf6","did:plc:q4jtwizaaqeetfxilujdmnd6","did:plc:m3mxdy7p7d7f6rsdet7wno45","did:plc:65yjn673rzf5naa3724qbqnd","did:plc:y55trrjsv7gq234g4najd67b","did:plc:i65lufv5kta4zhwzh6qjjbmy","did:plc:y5dlrharlxtdointoxeiqbsg","did:plc:wrs5q3vwxnicd4qfnsnag7mh","did:plc:rk4ixed5oczwwf2r57zqlhm7","did:plc:62d3z6vflqkdk4gatcfnnrho","did:plc:djtyba73gp5np2sy6xtu6vsc","did:plc:xmggetyawifua3rogn3c3mrg","did:plc:puz6ma7m6lkjyw7ifpuvkhxw","did:plc:rh7uk2afo6ag74fyz2wd5v6u","did:plc:5j7wnw4lm7q2bfhoedeg2yc6","did:plc:64cb7665yxhgcwxl6rhczfh5","did:plc:l6bcu2antgs5gmwb5o6367dd","did:plc:uwwnddwbmmgc73yiz24l6565","did:plc:2zcokkdzikfajxvhs4ky2udh","did:plc:4envh2xq267ju3in4y5xeyv2","did:plc:wrwrwks525omvpo6355rewys","did:plc:mul5ctx7d7cjsz3vrx3siuaf","did:plc:2ramljhpcsmg5nkicp5g67dx","did:plc:vfsc4iysvm5ssf6uwuvffdm7","did:plc:nlyatifegmoy6cjjx4zxjnff","did:plc:peh4jb3xwnocnfdfxcb2vyyy","did:plc:hpz25dublburrza77zm5k5mt","did:plc:egevky2yqowbhklq6rxjkkak","did:plc:25ipbty2xqg2emgft7ya2kea","did:plc:pyc2ihzpelxtg4cdkfzbhcv4","did:plc:lqx3r4voqrmip6plg532gmoj","did:plc:pjww3lv3ogt2fvnavri27xgm","did:plc:mlihnecklbryvmpnt3pyzpk6","did:plc:ysttj6b5fxuhd3yyq6wrl2wt","did:plc:kylml4wf5ych6pojshoo34kv","did:plc:6dc5rnxbmb22gmmsdisv7juh","did:plc:djsukgc366wfg7mpvmm3yv2n","did:plc:ta34e2zixpy2yx656slnq6fm","did:plc:4q2cwaikayx6bhsbfjiazvkw","did:plc:umufo7lrufh3i6zhli4k5bsv","did:plc:a5koaj4xe7rr2gkwjzg3flcy","did:plc:gpp4wzj3db7ecrg6rsb5p6s2","did:plc:mkovga5kxc3fcql5n32r5dus","did:plc:ievzc5ztlgafe37ve5vrzqcx","did:plc:vitaziuii22tzu6hpdic3tsn","did:plc:p5r6qfkldgamxnrp7s7fg7it","did:plc:yj3dzf3qycaamvxrl3i2l3of","did:plc:4oqu55vifzuxzmjmy3xm3qrp","did:plc:t7taxeilqi6kz4jrva2ce6ei","did:plc:3h46473m3lhvjqcurx35ymhj","did:plc:a3hvpmkieqldmnb23ndau3br","did:plc:xjkdrd4tldzovh7qoztqetrl","did:plc:syft4kdzlxkdzpvumwxbwctl","did:plc:rvnnlindwjvl3sxaayfx7244","did:plc:ummgcasg57ixrr2o4owvrua3","did:plc:uazgflpeb4stwiqlysr55ud7","did:plc:u6i62fgxi7k2xtpkczseprx4","did:plc:tapdz4fjuharo67wmfs36zgb","did:plc:opfkqvrr3g3wazzjqcnxkaqy","did:plc:vfc36it2vpjbsvhjr3yr5gzo","did:plc:urnyxitofmpsrsv2obn4p7go","did:plc:unbkvf3koznbochygpicwwae","did:plc:w52o44yne2flqvsas27rk4ve","did:plc:vndnrhelwmbi3akmertsnmt4","did:plc:vmhkgndzjddyjez6sozbedcn","did:plc:wswp2zzfuhwxqaiukpemo4wk","did:plc:weokkuptkn2kkyjms3xyuxkv","did:plc:wbqpvgo32v3g7agr3wykeb3v","did:plc:wtk7wq3y3i64z3umv44eutuj","did:plc:d3dnawu5marrs2gzmtvh3cmb","did:plc:z3bgemu4mziikxtvuwlljmqs","did:plc:xuazuhdvard4jnnorikkn3zp","did:plc:2el4ysguuhjs6e7522ing3jd","did:plc:22vk6xgnulavdftyz62ziv57","did:plc:zxxbggx4mqz6p4fwfvm62iec","did:plc:3ad3pvzhyt67ueu276um6xtm","did:plc:365tsab5f7bj4n73qjrt2xmh","did:plc:35qyhgpdnrydcgsja3nrhc2q","did:plc:543rduoibnehd2aapycts5qj","did:plc:57n2lffsgbskd2nfmjgucz4z","did:plc:3j6jrmqzmsvqb356nxmka6ra","did:plc:65qiwr52dmzqu6dpwah7kftl","did:plc:6iluioc2gufx7vofq5hrs5mq","did:plc:dpvfxikwyesebhvbycjt3xl3","did:plc:qg2c5bwq276qzquruu5puat5","did:plc:ggqdkwzeqp3cnuilr5qv35p5","did:plc:6al4rlinir27ndull7r46lz4","did:plc:qsqpjziyw2omfrsq5hw7eyn6","did:plc:dioqi3pv52enidkyrriqx76l","did:plc:3rydzxpjlpw6dqtjwynk243j","did:plc:qrxnv4aovpt6lgftgtxoodml","did:plc:dflgxbqvn3f7udrfgfx222eu","did:plc:ywnuslhsjf6ynlmynbrfesdz","did:plc:3vdrgzr2zybocs45yfhcr6ur","did:plc:56eu4dgnrcshzprop5allpta","did:plc:fc7zcwt22fanhkpwy7parivq","did:plc:ly6ens5mmnfo7mc3di7do5yb","did:plc:gtgqnbnm5uxyynbdd5rp3bf7","did:plc:k56o4fum4tmvvixo7brcvalp","did:plc:quurppmy7n3z4gept7uejlvs","did:plc:kekouh57fgxe6sm4eeuwvrjr","did:plc:gvku27wurj5dvhbnppz5gjwr","did:plc:oogtn2wrdtfm4wgxemfxenn4","did:plc:qvrv2pn4sgp7obpg4d46ruso","did:plc:iyuor6sjixqdyc2shed7pfsb","did:plc:mau6e5nkgsqzt26xifwktxsj","did:plc:oxn5yg7mn2ntlleforrdbzf6","did:plc:jgysjlql3r6m27bhjlmmfqlv","did:plc:cr3hy3anrjtchnpz62bao536","did:plc:m4z4427qhlksktuueidwztwc","did:plc:5e7foz6p4nmsch3ulrt42q6d","did:plc:l3wpfnmpwaz3xt2npekzxsgb","did:plc:nrdqipi4jisuhbkg6h3svnfu","did:plc:cnq2fajxvdjlvptyxjay4ef7","did:plc:hfges3vhqndpbwmp4si5wc44","did:plc:e36akxcx4jssfbigbcfdhkkq","did:plc:andexfnlkkjfhcomawrrv7wx","did:plc:6uow4ajxchftgyvvppnqa6uj","did:plc:nrekjak23c7uvadrdgcry2dl","did:plc:og4dkp7yxaumwtwmfwe7otxw","did:plc:ck4xwtsoj3usdzfzve57gr5l","did:plc:ot6steov4ykzhohvlxy36ri2","did:plc:mpctqnvappol4lcxob7rgl4q","did:plc:ynfpe5pj6tdvai26q54pik2k","did:plc:nj6m5ag4s6pgneoi7suwfqpu","did:plc:aixu3g5dewxyklkhad5x7gps","did:plc:mhxkhytir3zfvm3euczekt7t","did:plc:vcwhnyatkpaf2bvno4sz2odm","did:plc:apmglkdjzbypgppfvobrfx67","did:plc:zpiwiodvsevcv3lllhukaar5","did:plc:7mu5xg7bhyo453liv4r6rugx","did:plc:b6hmhoy52mvjgfx6oqqhn54u","did:plc:2wco2e2ybeg2lwpfx3kqjsuv","did:plc:rg2lsu5lmbw5vou4ec5lwctv","did:plc:4m5miyhvuicg7czvfyu3th2a","did:plc:ntin3nn63qambavwe6irerkm","did:plc:gybea3ocwyawfrunvjzby43c","did:plc:xvgvtntxzol3fa2qeozuxgpr","did:plc:kgure2ahunysteoeldkwkr56","did:plc:kmqfggsrpvfbfzn2umoj5x2u","did:plc:qpvhadxwwl5xnun6ib7okosi","did:plc:6lowz3oa4ctkcuvditg4fb7c","did:plc:ci5ofbqp34davfnmytm6nijt","did:plc:fdme4gb7mu7zrie7peay7tst","did:plc:r33d6wynfbi5mfinrjqfbmt5","did:plc:ayxotajazr5qn4yx5j5vwcys","did:plc:k5ljymm6yathwsx7ldeq346x","did:plc:qvgds53otyohus5lfcfjssk2","did:plc:665zrrgj5r4tbirodksrnqpf","did:plc:ebfzgnm6zqtr4hro4qlajk6h","did:plc:gycu7amwg3lp34u4whrozvno","did:plc:qbfamf5fqhv4qghk3l47fw7l","did:plc:2hrpmln2rrrykc2eqbb6s3b7","did:plc:xhbqykhkie2wzxteech3spju","did:plc:c3cruxl2cmdpf76n55t2hclc","did:plc:bnce6gqtxhtdtbsd2fbqxrec","did:plc:bupvrk6u37regjmh3votyljb","did:plc:h2p3grkeefw75hys6g7v3u77","did:plc:ius4ae427mgoismgvps32im2","did:plc:jwqtic3lsqlaot6numorn4bp","did:plc:ndlnbldudnmrhspugmj5u27c","did:plc:mew2nximgy4b7d3zdmqdsedf","did:plc:ovtolnpwgmcizgg62yw53ccl","did:plc:cu2zokgauxep3zt46tmhrmcq","did:plc:in46bwvp5fytkyys2mzy5ppv","did:plc:n5ddwqolbjpv2czaronz6q3d","did:plc:jdn2cv7yrfh57kl3xxkxk2zb","did:plc:ata4ssnzkxdpi2q5pebgbxag","did:plc:e4foyzhuivxj2m2vkforvthd","did:plc:qvvur7brkpbmwfgrxwwljqfx","did:plc:24usgujcxcw7d2mybojwpyt2","did:plc:v43pqz42l55litemxnntm7d2","did:plc:go2yr6gc7yzubof477ef5n5q","did:plc:lzjigfl7mxejfe6s4qva2h4w","did:plc:4nrledvetpntydn6gjq7wvks","did:plc:6d6yr6es3hnqk5lrhoioe5kf","did:plc:xbwwdiqu5gkvymcv5ty2ej4v","did:plc:g4xccramqxbbrcktibitntw5","did:plc:rrlz7tykdtbqro6akp7i3rjv","did:plc:rty42f6wxdsup346k4jvhiag","did:plc:a5kcc5anlpfvi7xgoqridt6x","did:plc:i36l6e5lmxhdk5ecldplehuf","did:plc:i64qojppdrz3efajygn753fe","did:plc:dnml5e5mgn6rvrwkwmfybbik","did:plc:csqkcostinmjc6hdbaqd3iqk","did:plc:ucd5jadx7ul3nzaz2hsavvls","did:plc:23aoojlotr4w43d27whijvb3","did:plc:dcrip3ge65dnvvipmv5ykhqg","did:plc:ovvhj7pbc6alu7sdihphshso","did:plc:ofukqysctfpahfjezerw3vbf","did:plc:vlsacc3tgj3clrelfdiiqb2o","did:plc:vww6spsbf7vpyoestb5lzk44","did:plc:jo6qdnxnyqdio6cq36xgc6tx","did:plc:2bjl7pccyx3zu2l4gk7ggs72","did:plc:lzf72xyqtkhhf24kjhfpfgau","did:plc:cbzllqihvuqpf7ehb3mcc43t","did:plc:6s5t2oss4faragsxi6atwb7i","did:plc:nbzls7akkt47oib4zqonzrxw","did:plc:gwpm3pe7p2xigazbkjf3eu7g","did:plc:fptxsywwixalhidwxybbmy3y","did:plc:r6ye7ovouy2sv6rkg3yocxrd","did:plc:jocm4pcpw5yjqyu66wv24vk5","did:plc:spiqsjaulo3l7evorib6spu3","did:plc:ws3kkwvk5tjyjnlqjfl7ypec","did:plc:l5n4qwodg5vfvpqxbcwub76b","did:plc:sxezckld4n7edlj74nwdfs6n","did:plc:fpmwl2k2mh4r4xhq4wv7oahl","did:plc:snihgjzh7r7b2g3liy6vq6hl","did:plc:ugma7pedohwg3vcihlhmx452","did:plc:vq5cogibijmfcyg67sremqsr","did:plc:wmr3iirixxka36wgzfkkmakd","did:plc:6nwn2kvqwfdbx64kl2benuv2","did:plc:jwrtjlk4asksfjhuwbjn7txa","did:plc:qp37xdh4yhqezudjaxfv7vsz","did:plc:r4zh5yb2h5yg5nmmvzznad73","did:plc:zhjsuxfscslpe3adr5bxjqcf","did:plc:yj4flg2llw33a74vf47kuz3f","did:plc:nkz67q2krr5zyajiwbga2jef","did:plc:cf6futaebyc2k4wgzsr4v42k"];

var sortedObj = [];

export async function modifyFlow() {
  
  try {
    
    document.getElementById("feedStruct").innerHTML = "";

    for (var i = 0; i < userCache.length; i++) {

      const userDataObj = await getUserRepo(userCache[i]);
      
      if (userDataObj === null) {
        
        continue;
      }
      
      var hasPostCollection = false;

      //check whether user has "collection": app.bsky.feed.post
      //^ this will determine whether user has any posts and whether we should continue
      for (var o = 0; o < userDataObj.collections.length; o++) {

        if (userDataObj.collections[o] === "app.bsky.feed.post") {

          hasPostCollection = true;
        }
      }

      if (hasPostCollection === false) {

        continue;
      }

      const userMostRecentPost = await listRecords(userCache[i], "app.bsky.feed.post");
      
      sortPosts(Date.parse(userMostRecentPost[0].value.createdAt), await post(userCache[i], userMostRecentPost[0]));
    }
  } catch(e) {
    
    console.log(e);
  }
}

function sortPosts(timestamp, newItem) {
  
  var recentCache = "";
  
  if (sortedObj.length === 0) {
    
    sortedObj[0] = [timestamp, newItem];
    
  } else if (sortedObj.length === 1) {
    
    if (timestamp < sortedObj[0][0]) {
      
      sortedObj.unshift([timestamp, newItem]);
    } else {
      
      sortedObj.push([timestamp, newItem]);
    }
  } else {
    
    for (var z = 0; z < sortedObj.length; z++) {
      
      if ((timestamp > sortedObj[z][0]) && ((z + 1) === sortedObj.length)) {
        
        sortedObj.splice(z + 1, 0, [timestamp, newItem]);
      }
      
      if ((timestamp > sortedObj[z][0]) && (timestamp < sortedObj[z + 1][0])) {
        
        sortedObj.splice(z + 1, 0, [timestamp, newItem]);
      }
    }
  }
  
  for (var x = 0; x < sortedObj.length; x++) {
    
    recentCache = recentCache + sortedObj[sortedObj.length - x - 1][1];
  }
  
  document.getElementById("feedStruct").innerHTML = "<spacer>" + recentCache + "</spacer>";
}