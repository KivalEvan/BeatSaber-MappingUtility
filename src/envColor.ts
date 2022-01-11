import { Color as Color } from './color';

export interface ColorScheme {
    _colorLeft?: Color | null;
    _colorRight?: Color | null;
    _envColorLeft?: Color | null;
    _envColorRight?: Color | null;
    _envColorLeftBoost?: Color | null;
    _envColorRightBoost?: Color | null;
    _obstacleColor?: Color | null;
}

type ColorSchemeList =
    | 'Default Custom'
    | 'The First'
    | 'Origins'
    | 'KDA'
    | 'Crab Rave'
    | 'Noir'
    | 'Rocket'
    | 'Green Day'
    | 'Timbaland'
    | 'FitBeat'
    | 'Linkin Park'
    | 'BTS'
    | 'Kaleidoscope'
    | 'Interscope'
    | 'Skrillex'
    | 'Billie Eilish'
    | 'Spooky'
    | 'Gaga'
    | 'Glass Desert';

export type EnvironmentColor = {
    readonly [csl in ColorSchemeList | string]: ColorScheme;
};

export const colorScheme: EnvironmentColor = {
    'Default Custom': {
        _colorLeft: {
            r: 0.7529412,
            g: 0.1882353,
            b: 0.1882353,
        },
        _colorRight: {
            r: 0.1254902,
            g: 0.3921569,
            b: 0.6588235,
        },
        _envColorLeft: {
            r: 0.7529412,
            g: 0.1882353,
            b: 0.1882353,
        },
        _envColorRight: {
            r: 0.1882353,
            g: 0.5960785,
            b: 1,
        },
        _obstacleColor: {
            r: 1,
            g: 0.1882353,
            b: 0.1882353,
        },
    },
    'The First': {
        _colorLeft: {
            r: 0.7843137,
            g: 0.07843138,
            b: 0.07843138,
        },
        _colorRight: {
            r: 0.1568627,
            g: 0.5568627,
            b: 0.8235294,
        },
        _envColorLeft: {
            r: 0.85,
            g: 0.08499997,
            b: 0.08499997,
        },
        _envColorRight: {
            r: 0.1882353,
            g: 0.675294,
            b: 1,
        },
        _obstacleColor: {
            r: 1,
            g: 0.1882353,
            b: 0.1882353,
        },
    },
    Origins: {
        _colorLeft: {
            r: 0.6792453,
            g: 0.5712628,
            b: 0,
        },
        _colorRight: {
            r: 0.7075472,
            g: 0,
            b: 0.5364411,
        },
        _envColorLeft: {
            r: 0.4910995,
            g: 0.6862745,
            b: 0.7,
        },
        _envColorRight: {
            r: 0.03844783,
            g: 0.6862745,
            b: 0.9056604,
        },
        _obstacleColor: {
            r: 0.06167676,
            g: 0.2869513,
            b: 0.3962264,
        },
    },
    KDA: {
        _colorLeft: {
            r: 0.6588235,
            g: 0.2627451,
            b: 0.1607843,
        },
        _colorRight: {
            r: 0.5019608,
            g: 0.08235294,
            b: 0.572549,
        },
        _envColorLeft: {
            r: 1,
            g: 0.3960785,
            b: 0.2431373,
        },
        _envColorRight: {
            r: 0.7607844,
            g: 0.1254902,
            b: 0.8666667,
        },
        _obstacleColor: {
            r: 1,
            g: 0.3960785,
            b: 0.2431373,
        },
    },
    'Crab Rave': {
        _colorLeft: {
            r: 0,
            g: 0.7130001,
            b: 0.07806564,
        },
        _colorRight: {
            r: 0.04805952,
            g: 0.5068096,
            b: 0.734,
        },
        _envColorLeft: {
            r: 0.134568,
            g: 0.756,
            b: 0.1557533,
        },
        _envColorRight: {
            r: 0.05647058,
            g: 0.6211764,
            b: 0.9,
        },
        _obstacleColor: {
            r: 0,
            g: 0.8117648,
            b: 0.09019608,
        },
    },
    Noir: {
        _colorLeft: {
            r: 0.1792453,
            g: 0.1792453,
            b: 0.1792453,
        },
        _colorRight: {
            r: 0.5943396,
            g: 0.5943396,
            b: 0.5943396,
        },
        _envColorLeft: {
            r: 0.4056604,
            g: 0.4056604,
            b: 0.4056604,
        },
        _envColorRight: {
            r: 0.6037736,
            g: 0.6037736,
            b: 0.6037736,
        },
        _obstacleColor: {
            r: 0.2358491,
            g: 0.2358491,
            b: 0.2358491,
        },
    },
    Rocket: {
        _colorLeft: {
            r: 1,
            g: 0.4980392,
            b: 0,
        },
        _colorRight: {
            r: 0,
            g: 0.5294118,
            b: 1,
        },
        _envColorLeft: {
            r: 0.9,
            g: 0.4866279,
            b: 0.3244186,
        },
        _envColorRight: {
            r: 0.4,
            g: 0.7180724,
            b: 1,
        },
        _obstacleColor: {
            r: 0.3176471,
            g: 0.6117647,
            b: 0.7254902,
        },
    },
    'Green Day': {
        _colorLeft: {
            r: 0.2588235,
            g: 0.7843138,
            b: 0.01960784,
        },
        _colorRight: {
            r: 0,
            g: 0.7137255,
            b: 0.6705883,
        },
        _envColorLeft: {
            r: 0,
            g: 0.7137255,
            b: 0.6705883,
        },
        _envColorRight: {
            r: 0.2588235,
            g: 0.7843137,
            b: 0.01960784,
        },
        _obstacleColor: {
            r: 0,
            g: 0.8117648,
            b: 0.09019608,
        },
    },
    Timbaland: {
        _colorLeft: {
            r: 0.5019608,
            g: 0.5019608,
            b: 0.5019608,
        },
        _colorRight: {
            r: 0.1,
            g: 0.5517647,
            b: 1,
        },
        _envColorLeft: {
            r: 0.1,
            g: 0.5517647,
            b: 1,
        },
        _envColorRight: {
            r: 0.1,
            g: 0.5517647,
            b: 1,
        },
        _obstacleColor: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
        },
    },
    FitBeat: {
        _colorLeft: {
            r: 0.8000001,
            g: 0.6078432,
            b: 0.1568628,
        },
        _colorRight: {
            r: 0.7921569,
            g: 0.1607843,
            b: 0.682353,
        },
        _envColorLeft: {
            r: 0.8,
            g: 0.5594772,
            b: 0.5594772,
        },
        _envColorRight: {
            r: 0.5594772,
            g: 0.5594772,
            b: 0.8,
        },
        _obstacleColor: {
            r: 0.2784314,
            g: 0.2784314,
            b: 0.4,
        },
    },
    'Linkin Park': {
        _colorLeft: {
            r: 0.6627451,
            g: 0.1643608,
            b: 0.1690187,
        },
        _colorRight: {
            r: 0.3870196,
            g: 0.5168997,
            b: 0.5568628,
        },
        _envColorLeft: {
            r: 0.7529412,
            g: 0.672753,
            b: 0.5925647,
        },
        _envColorRight: {
            r: 0.6241197,
            g: 0.6890281,
            b: 0.709,
        },
        _envColorLeftBoost: {
            r: 0.922,
            g: 0.5957885,
            b: 0.255394,
        },
        _envColorRightBoost: {
            r: 0.282353,
            g: 0.4586275,
            b: 0.6235294,
        },
        _obstacleColor: {
            r: 0.6627451,
            g: 0.1647059,
            b: 0.172549,
        },
    },
    BTS: {
        _colorLeft: {
            r: 1,
            g: 0.09019607,
            b: 0.4059771,
        },
        _colorRight: {
            r: 0.8018868,
            g: 0,
            b: 0.7517689,
        },
        _envColorLeft: {
            r: 0.7843137,
            g: 0.1254902,
            b: 0.5010797,
        },
        _envColorRight: {
            r: 0.6941177,
            g: 0.1254902,
            b: 0.8666667,
        },
        _envColorLeftBoost: {
            r: 0.9019608,
            g: 0.5411765,
            b: 1,
        },
        _envColorRightBoost: {
            r: 0.3490196,
            g: 0.8078431,
            b: 1,
        },
        _obstacleColor: {
            r: 0.6698113,
            g: 0.1800908,
            b: 0.5528399,
        },
    },
    Kaleidoscope: {
        _colorLeft: {
            r: 0.65882355,
            g: 0.1254902,
            b: 0.1254902,
        },
        _colorRight: {
            r: 0.28235295,
            g: 0.28235295,
            b: 0.28235295,
        },
        _envColorLeft: {
            r: 0.65882355,
            g: 0.1254902,
            b: 0.1254902,
        },
        _envColorRight: {
            r: 0.47058824,
            g: 0.47058824,
            b: 0.47058824,
        },
        _envColorLeftBoost: {
            r: 0.50196081,
            g: 0,
            b: 0,
        },
        _envColorRightBoost: {
            r: 0.49244517,
            g: 0,
            b: 0.53725493,
        },
        _obstacleColor: {
            r: 0.25098041,
            g: 0.25098041,
            b: 0.25098041,
        },
    },
    Interscope: {
        _colorLeft: {
            r: 0.726415,
            g: 0.62691,
            b: 0.31181,
        },
        _colorRight: {
            r: 0.589571,
            g: 0.297888,
            b: 0.723,
        },
        _envColorLeft: {
            r: 0.724254,
            g: 0.319804,
            b: 0.913725,
        },
        _envColorRight: {
            r: 0.764706,
            g: 0.758971,
            b: 0.913725,
        },
        _envColorLeftBoost: {
            r: 0.792453,
            g: 0.429686,
            b: 0.429868,
        },
        _envColorRightBoost: {
            r: 0.7038,
            g: 0.715745,
            b: 0.765,
        },
        _obstacleColor: {
            r: 0.588235,
            g: 0.298039,
            b: 0.721569,
        },
    },
    Skrillex: {
        _colorLeft: {
            r: 0.69803923,
            g: 0.14117648,
            b: 0.36862746,
        },
        _colorRight: {
            r: 0.32933334,
            g: 0.32299998,
            b: 0.38,
        },
        _envColorLeft: {
            r: 0.80000001,
            g: 0.28000003,
            b: 0.58594489,
        },
        _envColorRight: {
            r: 0.06525807,
            g: 0.57800001,
            b: 0.56867743,
        },
        _envColorLeftBoost: {
            r: 0.81176478,
            g: 0.30588236,
            b: 0.30588236,
        },
        _envColorRightBoost: {
            r: 0.27843139,
            g: 0.80000001,
            b: 0.44597632,
        },
        _obstacleColor: {
            r: 0.15686275,
            g: 0.60392159,
            b: 0.60392159,
        },
    },
    'Billie Eilish': {
        _colorLeft: {
            r: 0.80000001,
            g: 0.64481932,
            b: 0.43200001,
        },
        _colorRight: {
            r: 0.54808509,
            g: 0.61276591,
            b: 0.63999999,
        },
        _envColorLeft: {
            r: 0.81960785,
            g: 0.442,
            b: 0.184,
        },
        _envColorRight: {
            r: 0.94117647,
            g: 0.70677096,
            b: 0.56470591,
        },
        _obstacleColor: {
            r: 0.71325314,
            g: 0.56140977,
            b: 0.78301889,
        },
        _envColorLeftBoost: {
            r: 0.80000001,
            g: 0,
            b: 0,
        },
        _envColorRightBoost: {
            r: 0.55686277,
            g: 0.7019608,
            b: 0.77647066,
        },
    },
    Spooky: {
        _colorLeft: {
            r: 0.81960785,
            g: 0.49807876,
            b: 0.27702752,
        },
        _colorRight: {
            r: 0.37894738,
            g: 0.35789475,
            b: 0.40000001,
        },
        _envColorLeft: {
            r: 0.90196079,
            g: 0.23009226,
            b: 0,
        },
        _envColorRight: {
            r: 0.46005884,
            g: 0.56889427,
            b: 0.92941177,
        },
        _obstacleColor: {
            r: 0.81960791,
            g: 0.44313729,
            b: 0.18431373,
        },
        _envColorLeftBoost: {
            r: 0.33768433,
            g: 0.63207543,
            b: 0.33690813,
        },
        _envColorRightBoost: {
            r: 0.60209066,
            g: 0.3280082,
            b: 0.85849059,
        },
    },
    Gaga: {
        _colorLeft: {
            r: 0.85,
            g: 0.4333333,
            b: 0.7833334,
        },
        _colorRight: {
            r: 0.4705882,
            g: 0.8,
            b: 0.4078431,
        },
        _envColorLeft: {
            r: 0.706,
            g: 0.649,
            b: 0.2394706,
        },
        _envColorRight: {
            r: 0.894,
            g: 0.1625455,
            b: 0.7485644,
        },
        _obstacleColor: {
            r: 0.9921569,
            g: 0,
            b: 0.7719755,
        },
        _envColorLeftBoost: {
            r: 0.754717,
            g: 0.3610244,
            b: 0.22071921,
        },
        _envColorRightBoost: {
            r: 0,
            g: 0.7058824,
            b: 1,
        },
    },
    'Glass Desert': {
        _colorLeft: {
            r: 0.6792453,
            g: 0.5712628,
            b: 0,
        },
        _colorRight: {
            r: 0.7075472,
            g: 0,
            b: 0.5364411,
        },
        _envColorLeft: {
            r: 0.32222217,
            g: 0.6111111,
            b: 0.75,
        },
        _envColorRight: {
            r: 0.03844783,
            g: 0.62239975,
            b: 0.90566039,
        },
        _obstacleColor: {
            r: 0.06167676,
            g: 0.2869513,
            b: 0.3962264,
        },
    },
    'New World': {
        _colorLeft: {
            r: 0.625,
            g: 0.625,
            b: 0.625,
        },
        _colorRight: {
            r: 0.34375,
            g: 0.4375,
            b: 0.625,
        },
        _envColorLeft: {
            r: 0.21875,
            g: 0.28125,
            b: 0.46875,
        },
        _envColorRight: {
            r: 0.5,
            g: 0.5625,
            b: 0.78125,
        },
        _obstacleColor: {
            r: 0.625,
            g: 0.59375,
            b: 0.8125,
        },
    },
    'Girly Cupid': {
        _colorLeft: {
            r: 1,
            g: 0.1875,
            b: 0.1875,
        },
        _colorRight: {
            r: 0.375,
            g: 0.5625,
            b: 0.875,
        },
        _envColorLeft: {
            r: 0.375,
            g: 0.375,
            b: 0.375,
        },
        _envColorRight: {
            r: 0.625,
            g: 0.75,
            b: 0.875,
        },
        _obstacleColor: {
            r: 0.75,
            g: 0.75,
            b: 0.75,
        },
    },
    'T.R.Y Revolution': {
        _colorLeft: {
            r: 1,
            g: 0,
            b: 0.375,
        },
        _colorRight: {
            r: 0.125,
            g: 0.375,
            b: 0.90625,
        },
        _envColorLeft: {
            r: 1,
            g: 0.125,
            b: 0.375,
        },
        _envColorRight: {
            r: 0.1875,
            g: 0.5625,
            b: 1,
        },
        _obstacleColor: {
            r: 0.625,
            g: 0.625,
            b: 0.625,
        },
    },
    Frightmare: {
        _colorLeft: {
            r: 0.8125,
            g: 0.125,
            b: 0.125,
        },
        _colorRight: {
            r: 0.625,
            g: 0.625,
            b: 0.625,
        },
        _envColorLeft: {
            r: 0.625,
            g: 0.03215,
            b: 0.03215,
        },
        _envColorRight: {
            r: 0.71875,
            g: 0.71875,
            b: 0.71875,
        },
        _obstacleColor: {
            r: 0.1875,
            g: 0.1875,
            b: 0.1875,
        },
    },
    'Azure Raindrop': {
        _colorLeft: {
            r: 0.8125,
            g: 0.125,
            b: 0.125,
        },
        _colorRight: {
            r: 0.0625,
            g: 0.5,
            b: 0.875,
        },
        _envColorLeft: {
            r: 0.5625,
            g: 0.5625,
            b: 0.5625,
        },
        _envColorRight: {
            r: 0.0625,
            g: 0.5,
            b: 0.875,
        },
        _obstacleColor: {
            r: 0.75,
            g: 0.25,
            b: 0.75,
        },
    },
    'werewolf howls.': {
        _colorLeft: {
            r: 0.812,
            g: 0.125,
            b: 0.125,
        },
        _colorRight: {
            r: 0.25,
            g: 0.5,
            b: 0.75,
        },
        _envColorLeft: {
            r: 0.875,
            g: 0.062,
            b: 0.062,
        },
        _envColorRight: {
            r: 0.375,
            g: 0.375,
            b: 0.375,
        },
        _envColorLeftBoost: {
            r: 0.938,
            g: 0.062,
            b: 0.062,
        },
        _envColorRightBoost: {
            r: 0.938,
            g: 0.438,
            b: 0,
        },
        _obstacleColor: {
            r: 0.25,
            g: 0.25,
            b: 0.25,
        },
    },
    VENTEN: {
        _colorLeft: {
            r: 0.8125,
            g: 0.625,
            b: 0.375,
        },
        _colorRight: {
            r: 0.625,
            g: 0.375,
            b: 0.875,
        },
        _envColorLeft: {
            r: 0.78125,
            g: 0.625,
            b: 0.1875,
        },
        _envColorRight: {
            r: 0.09375,
            g: 0.4375,
            b: 0.6875,
        },
        _envColorLeftBoost: {
            r: 0.875,
            g: 0.0625,
            b: 0.375,
        },
        _envColorRightBoost: {
            r: 0.1875,
            g: 0.5,
            b: 0.875,
        },
        _obstacleColor: {
            r: 0.125,
            g: 0.25,
            b: 0.4375,
        },
    },
    'Unconscious Requiem': {
        _colorLeft: {
            r: 0.312,
            g: 0.312,
            b: 0.312,
        },
        _colorRight: {
            r: 0.419,
            g: 0.625,
            b: 0.213,
        },
        _envColorLeft: {
            r: 0.85,
            g: 0.085,
            b: 0.085,
        },
        _envColorRight: {
            r: 0.604,
            g: 0.604,
            b: 0.604,
        },
        _envColorLeftBoost: {
            r: 0.922,
            g: 0.596,
            b: 0.255,
        },
        _envColorRightBoost: {
            r: 0.259,
            g: 0.784,
            b: 0.02,
        },
        _obstacleColor: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
        },
    },
    'Pure-Hearted Armeria': {
        _colorLeft: {
            r: 0.25,
            g: 0.25,
            b: 0.25,
        },
        _colorRight: {
            r: 0.625,
            g: 0.625,
            b: 0.625,
        },
        _envColorLeft: {
            r: 0.25,
            g: 0.562,
            b: 0.312,
        },
        _envColorRight: {
            r: 0.562,
            g: 0.562,
            b: 0.562,
        },
        _obstacleColor: {
            r: 0.25,
            g: 0.5,
            b: 0.375,
        },
        _envColorLeftBoost: {
            r: 0.625,
            g: 0.188,
            b: 0.188,
        },
        _envColorRightBoost: {
            r: 0.125,
            g: 0.312,
            b: 0.688,
        },
    },
};
