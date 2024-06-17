import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const MotionCustomImage = motion(forwardRef((props, ref) => <Image ref={ref} {...props} />) as any)

export default MotionCustomImage
