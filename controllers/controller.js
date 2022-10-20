const Translate = require('@vitalets/google-translate-api');
const Searchedtext = require('../models/model')
const getlangcode = require('../languages/languages').getlangcode;
const checklang = require('../languages/languages').checklang;


exports.translator = async (req, res) => {
    if (!req.body.text || !req.body.to || !req.body.from)
        return res.status(406).json({
            "msg": "Please fill all the required fields"
        });

    let translate = {
        lang_to: req.body.to,
        lang_from: req.body.from,
        text: req.body.text
    };

    if (!checklang(translate.lang_to) || !checklang(translate.lang_from))
        return res.status(409).json({
            "msg": "any of the given input languages is not supported"
        })

    translate.lang_from = getlangcode(translate.lang_from);
    translate.lang_to = getlangcode(translate.lang_to);

    let flag = false;

    Searchedtext.find({
        text: translate.text
    }).sort({
        createdAt: 'desc'
    }).exec().then((text_obj) => {

        if (text_obj) {
            text_obj.forEach(obj => {

                if (obj.to_lang === translate.lang_to && obj.from_lang === translate.lang_from) {
                    flag = true;
                    return res.status(200).json("already stored output is: " + obj.output);
                }

            });
        }

        if (!flag) {


            Translate(translate.text, {
                to: translate.lang_to,
                from: translate.lang_from
            }).then(
                (data) => {

                    var check = data.from.language.iso;
                    if (check !== translate.lang_from) {
                        return res.status(400).json({ "msg": "The given text is not in the format of it's given language" });
                    }

                    const cached_obj = new Searchedtext({
                        text: translate.text,
                        to_lang: translate.lang_to,
                        from_lang: translate.lang_from,
                        output: data.text
                    });

                    cached_obj.save().then(
                        (cache_obj) => {
                            return res.status(200).json("output is : " + data.text);
                        }
                    )
                }
            )
        }
    }).catch((err) => {
        return res.status(500).json(err);
    })
};