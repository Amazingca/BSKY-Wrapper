import { post } from "./struct.js";
import { getUserRepo, listRecords } from "./api.js";
export const userCache = ["did:plc:yk4dd2qkboz2yv6tpubpc6co","did:plc:r5dkjie2lfywt2yjtygkwtgp","did:plc:6fktaamhhxdqb2ypum33kbkj","did:plc:s6zls33c575xfnlx2koycdgy","did:plc:me7jdq7tyswm4tivjqmsxuxo","did:plc:yeec2dqb2lrcbsdreca6szff","did:plc:ndbwqslzrica3slvj3nlyzcj","did:plc:qhptg7ge32txpsvknx6lrbur","did:plc:veeun74s3c6v2hfcinejcbx6","did:plc:imvk33pgsyoig6cvt6omwb3t","did:plc:4usllmhbbh57ba66t2sevlrl","did:plc:wqgdnqlv2mwiio6pfchwtrff","did:plc:q3jw5ut4ytwtrfvkn7n6mlqd","did:plc:o5tqfvsr5qwofe3icp7a6z6j","did:plc:gnmc53xy3rhbyepipqv2b3rl","did:plc:3f52o3x6r7mpchxajcwn4vco","did:plc:yoj2atdv4wrphd4x3hok2hmd","did:plc:iztv76aq7fbpxmyjwqv5vrhz","did:plc:hu354h4z2pu2ju3e4ualauqq","did:plc:if2tug5buc5a3crz2d2i24i3","did:plc:e4ybkxvnjdzjaszbybekjyms","did:plc:pmehoh7nqjfzrkkiudh7c3ax","did:plc:qqzutbxtul2oekubp7wjcitz","did:plc:7aw7gdcbux364jt4uvs6zrj6","did:plc:tgfzv5irks5acnmk75j4elky","did:plc:njubhwgks46s5fq5rksfz6nd","did:plc:fdwjo43qrbnccb4wkfogtxbk","did:plc:jf6cuqweurcbdhpupgtftssq","did:plc:ubtpz22ea37bb7wztmroiuqu","did:plc:wdei7ye75zmu6tjleezzbsjo","did:plc:or4icvgnvxsl2ofthjsvz24d","did:plc:pm6jxakrtzmkorra62cr43kr","did:plc:2q5oupusyl5i5jwba3jtk3ri","did:plc:336v7sgkf6ycvuwnb65rx5qr","did:plc:ybi44m2fwowkwzxfckv3hyno","did:plc:6al5t6ei6z6p4wzpmhpmwmdw","did:plc:2cxgdrgtsmrbqnjkwyplmp43","did:plc:5wk5wsvdpxr3b4sncfgf2app","did:plc:rqyxbvmx6htf5fwfnltvqzat","did:plc:cr26c7oguulx6ipxdy6bf2it","did:plc:fjsmdevv3mmzc3dpd36u5yxc","did:plc:ragtjsm2j2vknwkz3zp4oxrd","did:plc:vzmlifz3ghar4cu2hj3srga2","did:plc:7axcqwj4roha6mqpdhpdwczx","did:plc:gfdcef26d62oy3pz2jclqkaj","did:plc:qjeavhlw222ppsre4rscd3n2","did:plc:gbhvjwaxhiies2qcmdmdnwy5","did:plc:xutnox3ftsppgokcvr5os6om","did:plc:mn5nyf6pujwnikxjkxyu3u7h","did:plc:akyopoapqza6xjzthjnandaz","did:plc:w5lm6utpdvsg5spyybh76sae","did:plc:bapnorbjvs43bojtwki62mpd","did:plc:44ybard66vv44zksje25o7dz","did:plc:o2hywbrivbyxugiukoexum57","did:plc:at3xdn4twdcgow4uvzozjxop","did:plc:py2h6hogyec6bd4tyzafwv2x","did:plc:hbfkgnstjlgkaa57pcjkaf25","did:plc:4nb5ighj5i5lfqsjj4iemgas","did:plc:oky5czdrnfjpqslsw2a5iclo","did:plc:esodreswicorpgkoepoqbdl5","did:plc:4hivxx2dyvmt7xyxii5m7foe","did:plc:bnqkww7bjxaacajzvu5gswdf","did:plc:vpkhqolt662uhesyj6nxm7ys","did:plc:nb45ciey4zcmiennmrlnn6bc","did:plc:6nvbzutsgdtou45xqkjpkjuz","did:plc:tofqwadfexpj2sw2q2abwe4p","did:plc:ua6usdc4hzvzjsokoenba4zt","did:plc:4xvfoljklsvq326kk3i6sgfi","did:plc:tpg43qhh4lw4ksiffs4nbda3","did:plc:mleqlhvvzkt7omvlya3sfre3","did:plc:u2nphxzwzgl73yjvsbn7d4cg","did:plc:vjug55kidv6sye7ykr5faxxn","did:plc:z4kxliqf7m2gfnapliqlkumw","did:plc:pqlvkatzwlic3nvek6srxwjy","did:plc:tsk5huy4xspr4ku3smmrhe5k","did:plc:jhclbqfxc4w5unkpfuwpe4ce","did:plc:erza6cd5gefflbykwjtvfwbx","did:plc:sjdy3hnkzknl6jjat5bdggef","did:plc:pomrgqhag4t6pvrl5necxqq3","did:plc:qlcbqt26tt6oje62tve2m7w6","did:plc:qnk5lcl46adjiwniu7q6rt54","did:plc:afb274qkf6emjuhdfu3o7ggn","did:plc:ejb7grdekylalejwnbw4btgt","did:plc:l3rouwludahu3ui3bt66mfvj","did:plc:x2wnqtyzpyhs27xjpkxikf3x","did:plc:g2q2yxjlb6kexudg5xagqwis","did:plc:mxdqvruhze7qxiessj6isga2","did:plc:oypgij57lv3ytni32p2jqbce","did:plc:qmhqdkthno5d46nrthghndip","did:plc:vwcvjmj3sxgaxokunwzkhzom","did:plc:mmuor37pz56qlbddt2hv3tpe","did:plc:5mqrsk4fb6jdkbtdemlavuzx","did:plc:l5ubox2264vtrpl2lla2drdf","did:plc:ss7my2d633xvutojmlia2kbr","did:plc:2k7juufln3ne2qs7qjc5pdix","did:plc:ch7azdejgddtlijyzurfdihn","did:plc:cddm3j3km7kxbdjdrndaywvx","did:plc:mggtnuxqc2si5xfttdzcnukq","did:plc:t6j2np3furk7rfthx6soxeph","did:plc:fwhvp4j7dorchczd2sjfleoo","did:plc:ss7soegenrgbxcewxhfmtxdx","did:plc:vhju6pug3mqz4i2ntx47r5as","did:plc:by3mi3gmmaupxi6x56v2rerh","did:plc:hd5g6z5wauicendc3zilioir","did:plc:e2nwnarqo7kdbt7ngr3gejp6","did:plc:x37liwax4fxotpumelqu4pmu","did:plc:lsz27iba6myqfhatwihmyfzz","did:plc:hv3tzygvckr6tyzzkbwexpgl","did:plc:6bkqyo6c3fpzx4ecuq65j373","did:plc:oc6vwdlmk2kqyida5i74d3p5","did:plc:s5pbcofzgcgdhl3aqw7zvob7","did:plc:cwx2zxldt3uxciob3nxzhkzr","did:plc:6umh2rqttv3dxohq7gaxjk36","did:plc:d26lpcjh5haqpmy225kgc23e","did:plc:huqcfjnsmflp7ufekyquqrdt","did:plc:u6hniy6qydro3sulnisath4g","did:plc:egpxmsya32mhhh5smd375vcx","did:plc:cwkdw675dj5rsnpgttobk3fk","did:plc:nr55rexy4s2we22j56d4n46b","did:plc:wptnzi6wyzqltbenxapqa5qd","did:plc:xl4nejvjc52uhp25mceh3f7q","did:plc:jzx2rvqsq2rpri2rikwqdoqj","did:plc:dimjrgeatypdz72m4okacmrt","did:plc:n6com3b6tkpq76vr5n7xqutu","did:plc:qsispj34ogpfpoxodpdrqncw","did:plc:ndzftkdshpxde5wt33ndpjdg","did:plc:ymdx5ssbzyhxttf6pkongcjw","did:plc:opfkqvrr3g3wazzjqcnxkaqy","did:plc:w663x4pc6lktu7yoztulilnj","did:plc:64cb7665yxhgcwxl6rhczfh5","did:plc:espxmvx2fdigcsnz566fw3ku","did:plc:wmhp7mubpgafjggwvaxeozmu","did:plc:d3dnawu5marrs2gzmtvh3cmb","did:plc:nuv7t5xafsrdxs3265toepmq","did:plc:eqnsc3edjbj2x4zxnkwjxce3","did:plc:kyzoscapaac55jyw3zubfiod","did:plc:uqzpqmrjnptsxezjx4xuh2mn","did:plc:cov5jirdvelnzyzjirbdq2s5","did:plc:652rzzvvceyeht7tft5hmch6","did:plc:6akyvwcjf7u5rcmq6kzcltla","did:plc:6f2lm6ma2dlnmdss3pf65gnd","did:plc:zvfbpinehieygw4mhvzcuehy","did:plc:bx7dnzf2b55bxzyepbed52qk","did:plc:a3zea7slcuhagrvntjbqk74e","did:plc:tft77e5qkblxtneeib4lp3zk","did:plc:vkpeox45fjvt7lxqa5qw33yn","did:plc:4qzenu7snwpxxeh5yxgbni3f","did:plc:zqsakln5z6rnbg24c46gaboy","did:plc:kztnhmdr7q6yurcbwswh4dc7","did:plc:2wqb5jjkxli4rcswpyb624xj","did:plc:k4c4qbyhcjjlsgtm252rilsx","did:plc:5jeqch7q4bzoz2jmunc5qynk","did:plc:mfevdhofv5ibx4mdnhlvgnlu","did:plc:xl623go4ebk7vytyrqwhyau3","did:plc:3ovlqkndffifdbmfblxnfymz","did:plc:etsxtxicov2635bk44gp3jf6","did:plc:q4jtwizaaqeetfxilujdmnd6","did:plc:m3mxdy7p7d7f6rsdet7wno45","did:plc:65yjn673rzf5naa3724qbqnd","did:plc:y55trrjsv7gq234g4najd67b","did:plc:i65lufv5kta4zhwzh6qjjbmy","did:plc:y5dlrharlxtdointoxeiqbsg","did:plc:wrs5q3vwxnicd4qfnsnag7mh","did:plc:rk4ixed5oczwwf2r57zqlhm7","did:plc:62d3z6vflqkdk4gatcfnnrho","did:plc:djtyba73gp5np2sy6xtu6vsc","did:plc:5gfdduhv254dxcrwq7girxc3","did:plc:y54tdiwaa6qck6dh7ttwjmop","did:plc:iw23d676bri3urlldpm2eeh7","did:plc:vwgqkwuvk6i5hvq5urbttt26","did:plc:n5ddwqolbjpv2czaronz6q3d","did:plc:jqhnjoirsm7g4ac6ah5yh77z","did:plc:kscqlin25s5cb2cpn54672qk","did:plc:xmggetyawifua3rogn3c3mrg","did:plc:puz6ma7m6lkjyw7ifpuvkhxw","did:plc:rh7uk2afo6ag74fyz2wd5v6u","did:plc:5j7wnw4lm7q2bfhoedeg2yc6","did:plc:l6bcu2antgs5gmwb5o6367dd","did:plc:uwwnddwbmmgc73yiz24l6565","did:plc:2zcokkdzikfajxvhs4ky2udh","did:plc:4envh2xq267ju3in4y5xeyv2","did:plc:wrwrwks525omvpo6355rewys","did:plc:mul5ctx7d7cjsz3vrx3siuaf","did:plc:2ramljhpcsmg5nkicp5g67dx","did:plc:vfsc4iysvm5ssf6uwuvffdm7","did:plc:nlyatifegmoy6cjjx4zxjnff","did:plc:peh4jb3xwnocnfdfxcb2vyyy","did:plc:u4p6jb5slyshp37l5j2m5foh","did:plc:hscojcxjolcqrqaywibnsvdf","did:plc:57k57qgyj34okw3rjdxcvso3","did:plc:4bwm24kgymyj4q2iibn6vp6v","did:plc:g7ywx3tio2cqarmhyuf3doo6","did:plc:j4rqv3lkm2cqhl2ag4tc5qzd","did:plc:lqmpv2pxckdjn5qxleltwm7a","did:plc:n5gyjnvoyj36qc4nwtfpx4lx","did:plc:wozuofpfzm3alhx73tmbjfm6","did:plc:b5m345uranqet6smd6qqsxia","did:plc:epk3le5lzyswwksxo6at5qee","did:plc:4u4gv2zyabrdq7wnolqwn4j6","did:plc:j2xynreqgyp6bqbn25mywlug","did:plc:rlmflrcm4cttuu3mq7ekurd3","did:plc:qr5nhl76uah55hvjjvenja42","did:plc:z6px7a6yeun7ehx63rlufpve","did:plc:qkk4yywvh3b3qfdr4uhq3ub4","did:plc:lmbx35kbufw62q7sqlxh4kk7","did:plc:7korgh5te2r3tvf2tiiwnhp4","did:plc:yaknny2cxnqwtb63apit6j2q","did:plc:amcp4h6l37tjeqewlo3hiw6p","did:plc:tpljquxjjdiux3xd5cuzqzoi","did:plc:r2aq7fkapubx72cctzisxv35","did:plc:w7jicbitabtexqstm5ezqwsc","did:plc:25wfmrcs7oijil2bbqjv6xn2","did:plc:owp7f2vahdmyr5owp4ysgh2x","did:plc:xpfdj5lktfcb6l2bgp4ncz5z","did:plc:3divnee26pyjhlook4aszqlv","did:plc:owiphndnt3l3scfqbgantkgo","did:plc:iuakhx5dbn6krc6fyyo252wn","did:plc:srppuqziqjghhp5zabyfnju4","did:plc:vndptnw5k3evavlc2h4mzfyz","did:plc:w6fq4ageqofplofgkw7znanx","did:plc:wecvkbty7nmvposhodkiglwf","did:plc:wvtlchfqwpwwegflqm7474kn","did:plc:c3cg4nv5g7bj42b32w74xybr","did:plc:dvccohdv26oyn7ersiv6fr6r","did:plc:4spabmxhmet6rgfxohq6z24v","did:plc:q2t75gegfkclkytocpsu7cwb","did:plc:4hqjfn7m6n5hno3doamuhgef","did:plc:jcrdotw32gw7cw4pkqhi6rfh","did:plc:g65lxja5n2dhnonhbs7emsa7","did:plc:uy52lsbj4bsung4fvmyp2eyr","did:plc:toxbsecjng2uowt3vdfodqbb","did:plc:t7hdkeh2yhbnyo73kvzptvkn","did:plc:defhgd2kqmtz7gbchnxdchpe","did:plc:7need547t2sslkh5zbqg556k","did:plc:grxrck5m37xl6qoonma2ij6l","did:plc:gpp4wzj3db7ecrg6rsb5p6s2","did:plc:h3fmewu4j3welrpea5klq4dq","did:plc:gybea3ocwyawfrunvjzby43c","did:plc:gwpm3pe7p2xigazbkjf3eu7g","did:plc:gup2pxxpbiuydectihy34uno","did:plc:htwyxhtv74llinfktqipbexa","did:plc:hhhqj24mxeqvsev36oc2di65","did:plc:h53fa53zbp5uxe7tipd6gswm","did:plc:i5pllw6qk7ar7mlneqy2c3gh","did:plc:i4jevzsjvebp5pizkqnxt2tj","did:plc:i36l6e5lmxhdk5ecldplehuf","did:plc:hytilahosliwvg3nyt5tr4ul","did:plc:isazx7unyvm3djdbwwhva3si","did:plc:idxun6rywb4hiddaibdqunl3","did:plc:i64qojppdrz3efajygn753fe","did:plc:jqn7h3kund2qkp6ikq3d7bqi","did:plc:jocm4pcpw5yjqyu66wv24vk5","did:plc:jarevglh3bu75nebvamk466s","did:plc:le3egfhypnofpekma3idmedd","did:plc:kylml4wf5ych6pojshoo34kv","did:plc:kpycngn7yy7xvjdy4iorpg6z","did:plc:kmqfggsrpvfbfzn2umoj5x2u","did:plc:m4z4427qhlksktuueidwztwc","did:plc:lgzhgsov4beqwogxhn5yasay","did:plc:n6ubgbkebav34yrsoywpobii","did:plc:mmyj7mk7kh3jqhw6zs4prbuk","did:plc:mlihnecklbryvmpnt3pyzpk6","did:plc:uo6whpvssk6mw7k7fakun5hx","did:plc:nud7fe3oi2pqpuxklhnu7i4q","did:plc:nbzls7akkt47oib4zqonzrxw","did:plc:rm445sggtaoehykahc4izkvk","did:plc:xeversorxs4g7clndm64wmfv","did:plc:xmuwf76ymgxu5skdfafv3bal","did:plc:z5oehyfrcv3qipxqdxagrmvw","did:plc:pxq535lg62beejmtfh2seq26","did:plc:auhgiz2evangvgxkhox7qnkz","did:plc:pwon7p4ycvdjcuattnfzkzul","did:plc:oy7q7zlt2ilarrpmy2wkzorr","did:plc:bn5bzajnbf7mvvpt7cg7hrvi","did:plc:bkxblmnnhaiv7vhybcq7p4z3","did:plc:2pb7kt52fbndfpkdyl4uapdx","did:plc:2bs6lzyimzvye3blh362da2e","did:plc:g3afgkzxgakvza3wlaxgstmi","did:plc:f42wjardsyetijaoeb4pubvo","did:plc:e4fbbs2yxibls75vtb2rrild","did:plc:cm6v5vphowpf3x2mzjwjz333","did:plc:hjmmzwcptxpx3vmg2e47m5m3","did:plc:asjbzi757okpl3wi2nifq2ml","did:plc:ynjqdqmxyndjvh3j3vi2jde7","did:plc:wn2lgn2ujk2vpwj5korele6p","did:plc:viq6soit3porrokqnpt3vhfb","did:plc:vd5jqpnsvnevg6hzaawmcpm3","did:plc:ubtctlxkztbzkhvhzhjuvwg5","did:plc:tjahwh2lgwodvzomi6xez5r2","did:plc:mozixxrfb2anajfxo7c2u6se","did:plc:nk4mreuzituzyzfofvgis4fa","did:plc:vv6e5k64rzpveuk7m7aq25qg","did:plc:dpkrbwcrajeglhicgcn4voyg","did:plc:cr3hy3anrjtchnpz62bao536","did:plc:cf6futaebyc2k4wgzsr4v42k","did:plc:7pbgydbrdhzzrtq2v6ewrmib","did:plc:z3bgemu4mziikxtvuwlljmqs","did:plc:6iluioc2gufx7vofq5hrs5mq","did:plc:ggqdkwzeqp3cnuilr5qv35p5","did:plc:6al4rlinir27ndull7r46lz4","did:plc:qsqpjziyw2omfrsq5hw7eyn6","did:plc:dioqi3pv52enidkyrriqx76l","did:plc:3rydzxpjlpw6dqtjwynk243j","did:plc:qrxnv4aovpt6lgftgtxoodml","did:plc:dflgxbqvn3f7udrfgfx222eu","did:plc:ywnuslhsjf6ynlmynbrfesdz","did:plc:3vdrgzr2zybocs45yfhcr6ur","did:plc:imksbos2p6x4gclontamkzcv","did:plc:nqoaxs3dyihd6hadffc4mknv","did:plc:pjww3lv3ogt2fvnavri27xgm","did:plc:ufc7egtfayv5q4scm2e7cy5b","did:plc:ievzc5ztlgafe37ve5vrzqcx","did:plc:4q2cwaikayx6bhsbfjiazvkw","did:plc:egevky2yqowbhklq6rxjkkak","did:plc:fc7zcwt22fanhkpwy7parivq","did:plc:dpvfxikwyesebhvbycjt3xl3","did:plc:oxn5yg7mn2ntlleforrdbzf6","did:plc:vitaziuii22tzu6hpdic3tsn","did:plc:jgysjlql3r6m27bhjlmmfqlv","did:plc:nystk3ls2etsv3avrtp6swwm","did:plc:twmvkjsylxq4wm6qbrrgwyr7","did:plc:zv5u27266ocng2mbcrzc3dih","did:plc:5hcdlnia3b3yakgi4qumcyc4","did:plc:eqzbelpk6kujgrzghqbc3vmb","did:plc:owqd5o57pykgqzlx4a3vvcnu","did:plc:pyc2ihzpelxtg4cdkfzbhcv4","did:plc:6dc5rnxbmb22gmmsdisv7juh","did:plc:oogtn2wrdtfm4wgxemfxenn4","did:plc:5e7foz6p4nmsch3ulrt42q6d","did:plc:l3wpfnmpwaz3xt2npekzxsgb","did:plc:nrdqipi4jisuhbkg6h3svnfu","did:plc:3j6jrmqzmsvqb356nxmka6ra","did:plc:cnq2fajxvdjlvptyxjay4ef7","did:plc:hfges3vhqndpbwmp4si5wc44","did:plc:e36akxcx4jssfbigbcfdhkkq","did:plc:andexfnlkkjfhcomawrrv7wx","did:plc:6uow4ajxchftgyvvppnqa6uj","did:plc:yj3dzf3qycaamvxrl3i2l3of","did:plc:kekouh57fgxe6sm4eeuwvrjr","did:plc:nrekjak23c7uvadrdgcry2dl","did:plc:k56o4fum4tmvvixo7brcvalp","did:plc:og4dkp7yxaumwtwmfwe7otxw","did:plc:qvrv2pn4sgp7obpg4d46ruso","did:plc:ck4xwtsoj3usdzfzve57gr5l","did:plc:7r5c5jhtphcpkg3y55xu2y64","did:plc:urnyxitofmpsrsv2obn4p7go","did:plc:ot6steov4ykzhohvlxy36ri2","did:plc:mpctqnvappol4lcxob7rgl4q","did:plc:ynfpe5pj6tdvai26q54pik2k","did:plc:nj6m5ag4s6pgneoi7suwfqpu","did:plc:aixu3g5dewxyklkhad5x7gps","did:plc:mhxkhytir3zfvm3euczekt7t","did:plc:ly6ens5mmnfo7mc3di7do5yb","did:plc:vcwhnyatkpaf2bvno4sz2odm","did:plc:apmglkdjzbypgppfvobrfx67","did:plc:zpiwiodvsevcv3lllhukaar5","did:plc:365tsab5f7bj4n73qjrt2xmh","did:plc:7mu5xg7bhyo453liv4r6rugx","did:plc:b6hmhoy52mvjgfx6oqqhn54u","did:plc:2wco2e2ybeg2lwpfx3kqjsuv","did:plc:rg2lsu5lmbw5vou4ec5lwctv","did:plc:4m5miyhvuicg7czvfyu3th2a","did:plc:ntin3nn63qambavwe6irerkm","did:plc:xvgvtntxzol3fa2qeozuxgpr","did:plc:kgure2ahunysteoeldkwkr56","did:plc:gtgqnbnm5uxyynbdd5rp3bf7","did:plc:qpvhadxwwl5xnun6ib7okosi","did:plc:6lowz3oa4ctkcuvditg4fb7c","did:plc:ci5ofbqp34davfnmytm6nijt","did:plc:fdme4gb7mu7zrie7peay7tst","did:plc:vfc36it2vpjbsvhjr3yr5gzo","did:plc:mau6e5nkgsqzt26xifwktxsj","did:plc:ebfzgnm6zqtr4hro4qlajk6h","did:plc:gycu7amwg3lp34u4whrozvno","did:plc:qbfamf5fqhv4qghk3l47fw7l","did:plc:2hrpmln2rrrykc2eqbb6s3b7","did:plc:zxxbggx4mqz6p4fwfvm62iec","did:plc:57n2lffsgbskd2nfmjgucz4z","did:plc:xhbqykhkie2wzxteech3spju","did:plc:c3cruxl2cmdpf76n55t2hclc","did:plc:hpz25dublburrza77zm5k5mt","did:plc:bnce6gqtxhtdtbsd2fbqxrec","did:plc:mew2nximgy4b7d3zdmqdsedf","did:plc:ovtolnpwgmcizgg62yw53ccl","did:plc:cu2zokgauxep3zt46tmhrmcq","did:plc:543rduoibnehd2aapycts5qj","did:plc:vmhkgndzjddyjez6sozbedcn","did:plc:in46bwvp5fytkyys2mzy5ppv","did:plc:jwqtic3lsqlaot6numorn4bp","did:plc:jdn2cv7yrfh57kl3xxkxk2zb","did:plc:h2p3grkeefw75hys6g7v3u77","did:plc:ata4ssnzkxdpi2q5pebgbxag","did:plc:e4foyzhuivxj2m2vkforvthd","did:plc:qvvur7brkpbmwfgrxwwljqfx","did:plc:24usgujcxcw7d2mybojwpyt2","did:plc:v43pqz42l55litemxnntm7d2","did:plc:go2yr6gc7yzubof477ef5n5q","did:plc:lzjigfl7mxejfe6s4qva2h4w","did:plc:4nrledvetpntydn6gjq7wvks","did:plc:6d6yr6es3hnqk5lrhoioe5kf","did:plc:lqx3r4voqrmip6plg532gmoj","did:plc:xbwwdiqu5gkvymcv5ty2ej4v","did:plc:g4xccramqxbbrcktibitntw5","did:plc:syft4kdzlxkdzpvumwxbwctl","did:plc:ummgcasg57ixrr2o4owvrua3","did:plc:56eu4dgnrcshzprop5allpta","did:plc:rrlz7tykdtbqro6akp7i3rjv","did:plc:rty42f6wxdsup346k4jvhiag","did:plc:qg2c5bwq276qzquruu5puat5","did:plc:a5kcc5anlpfvi7xgoqridt6x","did:plc:65qiwr52dmzqu6dpwah7kftl","did:plc:k5ljymm6yathwsx7ldeq346x","did:plc:dnml5e5mgn6rvrwkwmfybbik","did:plc:csqkcostinmjc6hdbaqd3iqk","did:plc:bupvrk6u37regjmh3votyljb","did:plc:5n35m63crb6spzl42dvyqbcl","did:plc:ucd5jadx7ul3nzaz2hsavvls","did:plc:iyuor6sjixqdyc2shed7pfsb","did:plc:23aoojlotr4w43d27whijvb3","did:plc:dcrip3ge65dnvvipmv5ykhqg","did:plc:u6i62fgxi7k2xtpkczseprx4","did:plc:ovvhj7pbc6alu7sdihphshso","did:plc:quurppmy7n3z4gept7uejlvs","did:plc:ayxotajazr5qn4yx5j5vwcys","did:plc:ofukqysctfpahfjezerw3vbf","did:plc:vlsacc3tgj3clrelfdiiqb2o","did:plc:vww6spsbf7vpyoestb5lzk44","did:plc:jo6qdnxnyqdio6cq36xgc6tx","did:plc:3ad3pvzhyt67ueu276um6xtm","did:plc:2bjl7pccyx3zu2l4gk7ggs72","did:plc:2el4ysguuhjs6e7522ing3jd","did:plc:lzf72xyqtkhhf24kjhfpfgau","did:plc:ysttj6b5fxuhd3yyq6wrl2wt","did:plc:djsukgc366wfg7mpvmm3yv2n","did:plc:ta34e2zixpy2yx656slnq6fm","did:plc:cbzllqihvuqpf7ehb3mcc43t","did:plc:6s5t2oss4faragsxi6atwb7i","did:plc:t73wbjcyfqygxtwd2svvvnbm","did:plc:ugma7pedohwg3vcihlhmx452","did:plc:mkovga5kxc3fcql5n32r5dus","did:plc:zhjsuxfscslpe3adr5bxjqcf","did:plc:25ipbty2xqg2emgft7ya2kea","did:plc:gvku27wurj5dvhbnppz5gjwr","did:plc:unbkvf3koznbochygpicwwae","did:plc:r6ye7ovouy2sv6rkg3yocxrd","did:plc:p5r6qfkldgamxnrp7s7fg7it","did:plc:spiqsjaulo3l7evorib6spu3","did:plc:665zrrgj5r4tbirodksrnqpf","did:plc:ws3kkwvk5tjyjnlqjfl7ypec","did:plc:l5n4qwodg5vfvpqxbcwub76b","did:plc:wswp2zzfuhwxqaiukpemo4wk","did:plc:sxezckld4n7edlj74nwdfs6n","did:plc:qvgds53otyohus5lfcfjssk2","did:plc:22vk6xgnulavdftyz62ziv57","did:plc:fpmwl2k2mh4r4xhq4wv7oahl","did:plc:r33d6wynfbi5mfinrjqfbmt5","did:plc:snihgjzh7r7b2g3liy6vq6hl","did:plc:vq5cogibijmfcyg67sremqsr","did:plc:wmr3iirixxka36wgzfkkmakd","did:plc:a5koaj4xe7rr2gkwjzg3flcy","did:plc:ius4ae427mgoismgvps32im2","did:plc:6nwn2kvqwfdbx64kl2benuv2","did:plc:jwrtjlk4asksfjhuwbjn7txa","did:plc:qp37xdh4yhqezudjaxfv7vsz","did:plc:r4zh5yb2h5yg5nmmvzznad73","did:plc:yj4flg2llw33a74vf47kuz3f","did:plc:nkz67q2krr5zyajiwbga2jef","did:plc:umufo7lrufh3i6zhli4k5bsv"];

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
      } else if ((timestamp > sortedObj[z][0]) && (timestamp < sortedObj[z + 1][0])) {
        
        sortedObj.splice(z + 1, 0, [timestamp, newItem]);
      }
    }
  }
  
  for (var x = 0; x < sortedObj.length; x++) {
    
    recentCache = recentCache + sortedObj[sortedObj.length - x - 1][1];
  }
  
  document.getElementById("feedStruct").innerHTML = "<spacer>" + recentCache + "</spacer>";
}